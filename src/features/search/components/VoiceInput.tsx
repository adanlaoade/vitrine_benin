import { useCallback, useEffect, useRef, useState } from 'react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import {
  getSpeechRecognition,
  isSpeechRecognitionSupported,
  VOICE_STATE_LABELS,
  type VoiceState,
} from '@/lib/voice'

interface VoiceInputProps {
  onTranscript: (text: string) => void
  disabled?: boolean
}

export function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [state, setState] = useState<VoiceState>(() =>
    isSpeechRecognitionSupported() ? 'idle' : 'error',
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(
    isSpeechRecognitionSupported()
      ? null
      : 'Reconnaissance vocale non disponible sur cet appareil. Utilisez la saisie texte.',
  )
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const stopRecognition = useCallback(() => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
  }, [])

  useEffect(() => () => stopRecognition(), [stopRecognition])

  const startListening = () => {
    if (disabled || state === 'listening') return

    const recognition = getSpeechRecognition()
    if (!recognition) {
      setState('error')
      setErrorMessage(
        'Reconnaissance vocale non disponible. Utilisez la saisie texte.',
      )
      return
    }

    setErrorMessage(null)
    setState('listening')
    recognitionRef.current = recognition

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim() ?? ''
      setState('transcribing')
      window.setTimeout(() => {
        if (transcript) {
          setState('editable')
          onTranscript(transcript)
          window.setTimeout(() => setState('idle'), 1500)
        } else {
          setState('error')
          setErrorMessage('Aucune parole détectée. Réessayez ou saisissez votre recherche.')
        }
      }, 400)
    }

    recognition.onerror = (event) => {
      setState('error')
      if (event.error === 'not-allowed') {
        setErrorMessage('Accès au microphone refusé. Autorisez le micro ou utilisez le texte.')
      } else {
        setErrorMessage('Erreur microphone. Utilisez la saisie texte.')
      }
    }

    recognition.onend = () => {
      recognitionRef.current = null
    }

    try {
      recognition.start()
    } catch {
      setState('error')
      setErrorMessage('Impossible de démarrer le microphone.')
    }
  }

  const isActive = state === 'listening' || state === 'transcribing'

  return (
    <div className="flex flex-col items-center">
      <PrimaryButton
        type="button"
        variant={state === 'error' ? 'ghost' : 'secondary'}
        aria-label={VOICE_STATE_LABELS[state]}
        aria-pressed={isActive}
        disabled={disabled || isActive}
        onClick={startListening}
        className={[
          'min-w-11 px-3',
          state === 'listening' ? 'animate-pulse ring-2 ring-primary' : '',
        ].join(' ')}
      >
        {state === 'listening' ? '🎙' : state === 'transcribing' ? '…' : '🎤'}
      </PrimaryButton>
      {state !== 'idle' && (
        <p
          className={[
            'mt-1 max-w-[8rem] text-center text-[10px] leading-tight',
            state === 'error' ? 'text-danger' : 'text-text-muted',
          ].join(' ')}
          role="status"
          aria-live="polite"
        >
          {errorMessage ?? VOICE_STATE_LABELS[state]}
        </p>
      )}
    </div>
  )
}
