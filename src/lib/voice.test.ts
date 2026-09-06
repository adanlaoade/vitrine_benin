import { describe, expect, it } from 'vitest'
import { isSpeechRecognitionSupported, VOICE_STATE_LABELS } from '@/lib/voice'

describe('voice', () => {
  it('reports speech recognition unavailable in test env', () => {
    expect(isSpeechRecognitionSupported()).toBe(false)
  })

  it('defines labels for all five states', () => {
    expect(Object.keys(VOICE_STATE_LABELS)).toHaveLength(5)
    expect(VOICE_STATE_LABELS.idle).toBeTruthy()
    expect(VOICE_STATE_LABELS.error).toBeTruthy()
  })
})
