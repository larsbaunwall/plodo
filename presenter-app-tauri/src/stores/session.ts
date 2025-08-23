import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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

export const useSessionStore = defineStore('session', () => {
  // State
  const isSessionActive = ref(false)
  const sessionConfig = ref<SessionConfig | null>(null)
  const votingResults = ref<VotingResult[]>([])
  const sessionHealth = ref<SessionHealth>({ score: 0, status: 'excellent' })
  const sessionStartTime = ref<Date | null>(null)

  // Getters
  const totalVotes = computed(() => 
    votingResults.value.reduce((sum, result) => sum + result.count, 0)
  )

  const sessionDuration = computed(() => {
    if (!sessionStartTime.value) return 0
    return Date.now() - sessionStartTime.value.getTime()
  })

  const topVotingOption = computed(() => {
    if (votingResults.value.length === 0) return null
    const maxVotes = Math.max(...votingResults.value.map(r => r.count))
    return votingResults.value.find(r => r.count === maxVotes)
  })

  // Actions
  const createSession = async (config: SessionConfig) => {
    // Generate a simple session ID (6 uppercase alphanumeric characters)
    const sessionId = Math.random().toString(36).substr(2, 6).toUpperCase()
    
    const sessionConfigWithId = {
      ...config,
      id: sessionId
    }
    
    sessionConfig.value = sessionConfigWithId
    sessionStartTime.value = new Date()
    isSessionActive.value = true
    
    // Initialize voting results
    votingResults.value = config.votingOptions.map(option => ({
      optionId: option.id,
      count: 0
    }))

    // Reset session health
    sessionHealth.value = { score: 100, status: 'excellent' }
  }

  const endSession = () => {
    isSessionActive.value = false
    sessionStartTime.value = null
  }

  const addVote = (optionId: string) => {
    const result = votingResults.value.find(r => r.optionId === optionId)
    if (result) {
      result.count++
    }
    updateSessionHealth()
  }

  const resetVotes = () => {
    votingResults.value.forEach(result => {
      result.count = 0
    })
    sessionHealth.value = { score: 100, status: 'excellent' }
  }

  const updateSessionHealth = () => {
    // Simple health calculation based on voting activity
    const avgVotesPerOption = totalVotes.value / (sessionConfig.value?.votingOptions.length || 1)
    
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

  return {
    // State
    isSessionActive,
    sessionConfig,
    votingResults,
    sessionHealth,
    sessionStartTime,
    
    // Getters
    totalVotes,
    sessionDuration,
    topVotingOption,
    
    // Actions
    createSession,
    endSession,
    addVote,
    resetVotes,
    updateSessionHealth
  }
})
