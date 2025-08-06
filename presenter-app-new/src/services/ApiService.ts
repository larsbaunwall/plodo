import axios, { AxiosInstance } from 'axios';
import { apiConfig } from '../config/api';
import { useSessionStore } from '../stores/session';

class ApiService {
  private api: AxiosInstance;
  private eventSource: EventSource | null = null;
  private sessionStore = useSessionStore();

  constructor() {
    this.api = axios.create({
      baseURL: `${apiConfig.apiEndpoint}/${apiConfig.apiVersion}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.api.interceptors.request.use((config) => {
      config.headers['X-App-Version'] = '2.0.0';
      return config;
    });
  }

  async joinSession(sessionId: string, options: any[]) {
    try {
      const response = await this.api.post('/session/join', {
        sessionId,
        options
      });
      return response.data;
    } catch (error) {
      console.error('Failed to join session:', error);
      throw error;
    }
  }

  async leaveSession(sessionId: string) {
    try {
      await this.api.post('/session/leave', { sessionId });
    } catch (error) {
      console.error('Failed to leave session:', error);
    }
  }

  connectEventStream(sessionId: string) {
    if (this.eventSource) {
      this.closeEventStream();
    }

    const url = `${apiConfig.streamEndpoint}?sessionId=${sessionId}`;
    this.eventSource = new EventSource(url);

    this.eventSource.onopen = () => {
      console.log('Event stream connected');
      this.sessionStore.setStreamConnection(true);
    };

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleStreamEvent(data);
      } catch (error) {
        console.error('Failed to parse stream event:', error);
      }
    };

    this.eventSource.onerror = () => {
      console.error('Event stream error');
      this.sessionStore.setStreamConnection(false);
      this.sessionStore.setReconnecting(true);
      
      setTimeout(() => {
        if (this.sessionStore.isSessionActive) {
          this.connectEventStream(sessionId);
        }
      }, 3000);
    };
  }

  closeEventStream() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.sessionStore.setStreamConnection(false);
    }
  }

  private handleStreamEvent(data: any) {
    switch (data.type) {
      case 'vote':
        this.sessionStore.recordVote(data.emojiId);
        break;
      case 'audience-join':
        this.sessionStore.updateAudienceCount(data.count);
        break;
      case 'audience-leave':
        this.sessionStore.updateAudienceCount(data.count);
        break;
      default:
        console.log('Unknown stream event:', data);
    }
  }
}

export const apiService = new ApiService();
