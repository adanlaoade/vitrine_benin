import type { ReactNode } from 'react'

interface ToastProps {
  message: string | null
}

export function Toast({ message }: ToastProps) {
  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-text px-4 py-2 text-sm text-white shadow-lg"
    >
      {message}
    </div>
  )
}

export function ToastHost({ message }: { message: string | null }): ReactNode {
  return <Toast message={message} />
}
