import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function PageContainer({ children, title, subtitle }: PageContainerProps) {
  return (
    <div className="mx-auto min-h-dvh max-w-lg pb-20">
      {(title || subtitle) && (
        <header className="border-b border-border bg-surface px-4 py-4">
          {title && (
            <h1 className="text-xl font-bold text-text">{title}</h1>
          )}
          {subtitle && (
            <p className="mt-0.5 text-sm text-text-muted">{subtitle}</p>
          )}
        </header>
      )}
      <main className="px-4 py-4">{children}</main>
    </div>
  )
}
