export type VoiceState =
  | 'idle'
  | 'listening'
  | 'transcribing'
  | 'editable'
  | 'error'

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false
  return Boolean(
    window.SpeechRecognition ?? window.webkitSpeechRecognition,
  )
}

export function getSpeechRecognition(): SpeechRecognition | null {
  if (!isSpeechRecognitionSupported()) return null
  const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition
  if (!Ctor) return null
  const recognition = new Ctor()
  recognition.lang = 'fr-FR'
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  return recognition
}

export const VOICE_STATE_LABELS: Record<VoiceState, string> = {
  idle: 'Recherche vocale',
  listening: 'Écoute en cours…',
  transcribing: 'Transcription…',
  editable: 'Texte modifiable',
  error: 'Microphone indisponible',
}
