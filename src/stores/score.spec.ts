import { describe, it, expect, beforeEach } from 'vitest'
import { useScoreStore } from '@/stores/score'
import Player from '@/models/Player'
import { createPinia, setActivePinia } from 'pinia'

describe('useScoreStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with 0 points for both dark and light', () => {
    const store = useScoreStore()

    expect(store.dark).toBe(0)
    expect(store.light).toBe(0)
  })

  it('should increment dark score', () => {
    const store = useScoreStore()

    store.incrementDark()

    expect(store.dark).toBe(1)
  })

  it('should increment light score', () => {
    const store = useScoreStore()

    store.incrementLight()

    expect(store.light).toBe(1)
  })

  it('should reset both dark and light scores', () => {
    const store = useScoreStore()

    store.incrementDark()
    store.incrementLight()

    store.reset()

    expect(store.dark).toBe(0)
    expect(store.light).toBe(0)
  })

  it('should declare Player.DARK as winner when dark reaches max score', () => {
    const store = useScoreStore()

    for (let i = 0; i < 12; i++) {
      store.incrementDark()
    }

    expect(store.winner).toBe(Player.DARK)
  })

  it('should declare Player.LIGHT as winner when light reaches max score', () => {
    const store = useScoreStore()

    for (let i = 0; i < 12; i++) {
      store.incrementLight()
    }

    expect(store.winner).toBe(Player.LIGHT)
  })

  it('should not declare a winner if neither reaches max score', () => {
    const store = useScoreStore()

    for (let i = 0; i < 11; i++) {
      store.incrementDark()
      store.incrementLight()
    }

    expect(store.winner).toBeNull()
  })
})
