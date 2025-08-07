import axios, { AxiosInstance } from 'axios';
import { apiConfig } from '../config/api';
import { useSessionStore } from '../stores/session';

class ApiService {
  private api: AxiosInstance;
  private eventSource: EventSource | null = null;

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

    const sessionStore = this.getSessionStore();
    const url = `${apiConfig.streamEndpoint}?sessionId=${sessionId}`;
    this.eventSource = new EventSource(url);

    this.eventSource.onopen = () => {
      console.log('Event stream connected');
      sessionStore.setStreamConnection(true);
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
      sessionStore.setStreamConnection(false);
      sessionStore.setReconnecting(true);
      
      setTimeout(() => {
        if (sessionStore.isSessionActive) {
          this.connectEventStream(sessionId);
        }
      }, 3000);
    };
  }

  closeEventStream() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      const sessionStore = this.getSessionStore();
      sessionStore.setStreamConnection(false);
    }
  }

  private handleStreamEvent(data: any) {
    const sessionStore = this.getSessionStore();
    switch (data.type) {
      case 'vote':
        sessionStore.recordVote(data.emojiId);
        break;
      case 'audience-join':
        sessionStore.updateAudienceCount(data.count);
        break;
      case 'audience-leave':
        sessionStore.updateAudienceCount(data.count);
        break;
      default:
        console.log('Unknown stream event:', data);
    }
  }

  private getSessionStore() {
    return useSessionStore();
  }
}

export const apiService = new ApiService();
