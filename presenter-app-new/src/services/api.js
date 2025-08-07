import axios from 'axios';
import { useSessionStore } from '../stores/session';
import { appWindow } from '@tauri-apps/api/window';
import { getVersion } from '@tauri-apps/api/app';
import config from '../config';

let evtSource = null;
let sseReconnectFrequencySeconds = 1;
let shouldCloseEvtSource = false;

const axiosInstance = axios.create({
  baseURL: `${config.apiEndpoint}/${config.apiVersion}`,
});

class ApiService {
  constructor() {
    this.init();
  }

  async init() {
    const version = await getVersion();
    
    axiosInstance.interceptors.request.use(
      async request => {
        request.headers['X-App-Version'] = version;
        
        const sessionStore = useSessionStore();
        if (sessionStore.accessToken) {
          request.headers.Authorization = `Bearer ${sessionStore.accessToken}`;
        }
        return request;
      },
      error => {
        console.log('Could not complete API request', { error });
        return Promise.reject(error);
      }
    );
  }

  /**
   * Create a new session on the server
   *
   * @param {{id}[]} votingOptions for the sessions
   * @returns {{sessionId:String, accessToken:{}}} session data
   */
  async joinSession(votingOptions) {
    const { data } = await axiosInstance.post('sessions', {
      votingOptions: votingOptions.map(x => x.id),
    });

    return data;
  }

  /**
   * Abandon a session on the server
   *
   * @param {String} sessionId
   */
  async leaveSession(sessionId) {
    const sessionStore = useSessionStore();
    await axiosInstance.delete(`sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${sessionStore.accessToken}` },
    });
    this.closeEventStream();
  }

  connectEventStream() {
    this.onConnectEventStream();
  }

  closeEventStream() {
    this.onCloseEventStream();
  }

  onCloseEventStream() {
    shouldCloseEvtSource = true;
    if (evtSource) evtSource.close();
    const sessionStore = useSessionStore();
    sessionStore.updateSessionStreamState(false);
    console.log('stream closed');
  }

  async onConnectEventStream() {
    console.log('Connecting eventstream');
    const sessionStore = useSessionStore();
    const version = await getVersion();
    
    shouldCloseEvtSource = false;
    const waitFunc = () => sseReconnectFrequencySeconds * 1000;
    const tryToSetupFunc = () => {
      if (!shouldCloseEvtSource) {
        setupEventSource();
        sseReconnectFrequencySeconds *= 2;
        if (sseReconnectFrequencySeconds >= 64) {
          sseReconnectFrequencySeconds = 64;
        }
      }
    };

    const setupEventSource = () => {
      if (evtSource) evtSource.close();

      evtSource = new EventSource(`${config.streamEndpoint}?access_token=${sessionStore.accessToken}&appVersion=${version}`, {
        withCredentials: true,
      });

      sessionStore.updateSessionStreamState(true);

      evtSource.addEventListener('vote', msg => {
        sessionStore.processVote(msg);
      });

      evtSource.addEventListener('audienceJoined', msg => {
        sessionStore.audienceJoined(msg);
      });

      evtSource.addEventListener('terminate', msg => {
        this.closeEventStream();
      });

      evtSource.onopen = e => {
        sseReconnectFrequencySeconds = 1;
        console.log('Eventstream opened', { e });
      };
      
      evtSource.onerror = e => {
        console.log('Eventstream error', { e });
        evtSource.close();
        sessionStore.updateSessionStreamState(false);
        setTimeout(tryToSetupFunc, waitFunc());
      };
    };

    setupEventSource();
  }
}

export const apiService = new ApiService();