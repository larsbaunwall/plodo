import { config } from './config'
import { useSessionStore } from '../stores/session'

const baseUrl = `${config.apiEndpoint}/${config.apiVersion}`

export const ApiService = {
  async joinSession(votingOptions: Array<{ id: string }>) {
    const res = await fetch(`${baseUrl}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ votingOptions: votingOptions.map(x => x.id) }),
    })
    if (!res.ok) throw new Error('Failed to create session')
    return res.json() as Promise<{ sessionId: string; accessToken: { token: string } }>
  },

  async leaveSession(sessionId: string, token: string) {
    const res = await fetch(`${baseUrl}/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Failed to leave session')
  },

  connectEventStream(appVersion: string) {
    const store = useSessionStore()
    const token = store.accessToken
    if (!token) return

    let evtSource: EventSource | null = null
    let backoffSec = 1
    let shouldClose = false

    const open = () => {
      if (evtSource) evtSource.close()
      const url = `${config.streamEndpoint}?access_token=${encodeURIComponent(token)}&appVersion=${encodeURIComponent(appVersion)}`
      evtSource = new EventSource(url, { withCredentials: true })
      store.updateSessionStreamState(true)

      evtSource.addEventListener('vote', msg => {
        store.processVote((msg as MessageEvent).data as string)
      })
      evtSource.addEventListener('audienceJoined', _ => {
        store.audienceJoined()
      })
      evtSource.addEventListener('audienceLeft', _ => {
        store.audienceLeft()
      })
      evtSource.addEventListener('terminate', _ => {
        ApiService.closeEventStream()
      })

      evtSource.onopen = () => {
        backoffSec = 1
      }
      evtSource.onerror = () => {
        store.updateSessionStreamState(false)
        if (evtSource) evtSource.close()
        if (!shouldClose) {
          setTimeout(() => open(), backoffSec * 1000)
          backoffSec = Math.min(backoffSec * 2, 64)
        }
      }
    }

    open()

    return () => {
      shouldClose = true
      if (evtSource) evtSource.close()
      store.updateSessionStreamState(null)
    }
  },

  closeEventStream() {
    const store = useSessionStore()
    store.updateSessionStreamState(null)
  },
}
