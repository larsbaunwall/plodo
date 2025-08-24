import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ApiService } from '../common/ApiService'

export interface VotingOption {
  id: string
  emoji: string
  label: string
}

export interface VotingResult {
  optionId: string
  count: number
}

export interface SessionConfig {
  id?: string
  votingOptions: VotingOption[]
}

export interface SessionHealth {
  score: number
  status: 'excellent' | 'good' | 'fair' | 'poor'
}

type ScreenInfo = {
  id: string
  name: string
  size: { width: number; height: number }
  isPrimary: boolean
}

export const useSessionStore = defineStore('session', () => {
  const isSessionActive = ref(false)
  const sessionConfig = ref<SessionConfig | null>(null)
  const votingResults = ref<VotingResult[]>([])
  const sessionHealth = ref<SessionHealth>({ score: 0, status: 'excellent' })
  const sessionStartTime = ref<Date | null>(null)

  const accessToken = ref<string>('')
  const stream = ref<{ connected: boolean | null }>({ connected: false })
  const celebrate = ref<boolean>(false)
  const audience = ref<number>(0)
  const screens = ref<ScreenInfo[]>([])
  const celebrationScreen = ref<string>('')

  const totalVotes = computed<number>(() =>
    votingResults.value.reduce((sum: number, result: VotingResult) => sum + result.count, 0)
  )

  const sessionDuration = computed<number>(() => {
    if (!sessionStartTime.value) return 0
    return Date.now() - sessionStartTime.value.getTime()
  })

  const topVotingOption = computed<VotingResult | null>(() => {
    if (votingResults.value.length === 0) return null
    const maxVotes = Math.max(...votingResults.value.map((r: VotingResult) => r.count))
    return votingResults.value.find((r: VotingResult) => r.count === maxVotes) || null
  })

  const createSession = async (config: SessionConfig) => {
    const result = await ApiService.joinSession(config.votingOptions)
    accessToken.value = result.accessToken.token
    sessionConfig.value = { ...config, id: result.sessionId }
    sessionStartTime.value = new Date()
    isSessionActive.value = true
    votingResults.value = config.votingOptions.map(option => ({
      optionId: option.id,
      count: 0,
    }))
    sessionHealth.value = { score: 100, status: 'excellent' }
    ApiService.connectEventStream('tauri')
  }

  const endSession = async () => {
    if (sessionConfig.value?.id && accessToken.value) {
      await ApiService.leaveSession(sessionConfig.value.id, accessToken.value)
    }
    isSessionActive.value = false
    sessionStartTime.value = null
    sessionConfig.value = null
    accessToken.value = ''
    stream.value.connected = false
    votingResults.value = []
    audience.value = 0
  }

  const processVote = (optionId: string) => {
    const result = votingResults.value.find((r: VotingResult) => r.optionId === optionId)
    if (result) {
      result.count++
    }
    updateSessionHealth()
  }

  const addVote = (optionId: string) => {
    processVote(optionId)
  }

  const resetVotes = () => {
    votingResults.value.forEach((result: VotingResult) => {
      result.count = 0
    })
    sessionHealth.value = { score: 100, status: 'excellent' }
  }

  const updateSessionHealth = () => {
    const len = sessionConfig.value?.votingOptions.length || 1
    const avgVotesPerOption = totalVotes.value / len

    if (avgVotesPerOption >= 10) {
      sessionHealth.value = { score: 100, status: 'excellent' }
    } else if (avgVotesPerOption >= 5) {
      sessionHealth.value = { score: 75, status: 'good' }
    } else if (avgVotesPerOption >= 2) {
      sessionHealth.value = { score: 50, status: 'fair' }
    } else {
      sessionHealth.value = { score: 25, status: 'poor' }
    }
  }

  const audienceJoined = () => {
    audience.value = audience.value + 1
  }

  const audienceLeft = () => {
    audience.value = Math.max(0, audience.value - 1)
  }

  const toggleCelebration = (val: boolean) => {
    celebrate.value = val
  }

  const updateSessionStreamState = (connected: boolean | null) => {
    stream.value.connected = connected
  }

  const setScreens = (all: ScreenInfo[]) => {
    screens.value = all
  }

  const setCelebrationScreen = (id: string) => {
    celebrationScreen.value = id
  }

  return {
    isSessionActive,
    sessionConfig,
    votingResults,
    sessionHealth,
    sessionStartTime,

    accessToken,
    stream,
    celebrate,
    audience,
    screens,
    celebrationScreen,

    totalVotes,
    sessionDuration,
    topVotingOption,

    createSession,
    endSession,
    addVote,
    resetVotes,
    updateSessionHealth,

    processVote,
    audienceJoined,
    audienceLeft,
    toggleCelebration,
    updateSessionStreamState,
    setScreens,
    setCelebrationScreen,
  }
})
