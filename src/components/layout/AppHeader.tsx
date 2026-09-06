import { Link } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <Link to="/" className="flex flex-col">
          <span className="text-lg font-bold text-primary">Azo</span>
          <span className="text-xs text-text-muted leading-tight">
            La compétence béninoise à portée de main
          </span>
        </Link>
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-muted"
          aria-label="Notifications (démonstration)"
          title="Notification de démonstration"
        >
          🔔
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
