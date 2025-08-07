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
      
      // Create a custom EventSource implementation that allows headers
      class CustomEventSource {
        constructor(url, options) {
          this.url = url;
          this.options = options;
          this.eventListeners = {};
          this.readyState = 0; // CONNECTING
          this.connect();
        }
        
        connect() {
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${sessionStore.accessToken}`);
          headers.append('X-App-Version', version);
          
          fetch(this.url, {
            method: 'GET',
            headers: headers,
            credentials: this.options.withCredentials ? 'include' : 'same-origin',
          }).then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            
            this.readyState = 1; // OPEN
            this.dispatchEvent(new Event('open'));
            
            const processChunk = ({ done, value }) => {
              if (done) {
                this.readyState = 2; // CLOSED
                this.dispatchEvent(new Event('close'));
                return;
              }
              
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n\n');
              buffer = lines.pop() || '';
              
              for (const line of lines) {
                if (line.trim() === '') continue;
                
                const eventData = line.split('\n');
                let event = 'message';
                let data = '';
                
                for (const part of eventData) {
                  if (part.startsWith('event:')) {
                    event = part.slice(6).trim();
                  } else if (part.startsWith('data:')) {
                    data = part.slice(5).trim();
                  }
                }
                
                const messageEvent = new MessageEvent(event, { data });
                this.dispatchEvent(messageEvent);
              }
              
              reader.read().then(processChunk);
            };
            
            reader.read().then(processChunk);
          }).catch(error => {
            this.readyState = 2; // CLOSED
            this.dispatchEvent(new Event('error'));
            console.error('EventSource error:', error);
            
            // Reconnect after a delay
            setTimeout(() => {
              if (this.readyState === 2) { // Only reconnect if still closed
                this.connect();
              }
            }, 1000);
          });
        }
        
        addEventListener(type, listener) {
          if (!this.eventListeners[type]) {
            this.eventListeners[type] = [];
          }
          this.eventListeners[type].push(listener);
        }
        
        removeEventListener(type, listener) {
          if (!this.eventListeners[type]) return;
          this.eventListeners[type] = this.eventListeners[type].filter(l => l !== listener);
        }
        
        dispatchEvent(event) {
          const listeners = this.eventListeners[event.type] || [];
          for (const listener of listeners) {
            listener(event);
          }
          
          if (event.type === 'message' && this.onmessage) {
            this.onmessage(event);
          } else if (event.type === 'open' && this.onopen) {
            this.onopen(event);
          } else if (event.type === 'error' && this.onerror) {
            this.onerror(event);
          }
        }
        
        close() {
          this.readyState = 2; // CLOSED
          this.dispatchEvent(new Event('close'));
        }
      }
      
      evtSource = new CustomEventSource(`${config.streamEndpoint}`, {
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