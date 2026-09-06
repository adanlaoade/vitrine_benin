import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
  loading?: boolean
}

const variantClasses = {
  primary:
    'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark disabled:opacity-50',
  secondary:
    'bg-white text-primary border border-primary hover:bg-primary-light active:bg-primary-light disabled:opacity-50',
  ghost:
    'bg-transparent text-primary hover:bg-primary-light active:bg-primary-light disabled:opacity-50',
}

export function PrimaryButton({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={[
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors',
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? 'Chargement…' : children}
    </button>
  )
}
