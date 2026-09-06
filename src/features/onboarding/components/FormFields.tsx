import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldWrapperProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}

export function FieldWrapper({
  label,
  error,
  hint,
  required,
  children,
}: FieldWrapperProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-text">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-text-muted">{hint}</p>
      )}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

export function TextInput({
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={[inputClass, error ? 'border-danger' : ''].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

export function TextArea({
  error,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      className={[inputClass, 'min-h-24 resize-y', error ? 'border-danger' : '']
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}

export function SelectInput({
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      className={[inputClass, error ? 'border-danger' : ''].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </select>
  )
}
