import type { TrainingDocument } from '@/types'

interface TrainingDocumentCardProps {
  document: TrainingDocument
}

export function TrainingDocumentCard({ document }: TrainingDocumentCardProps) {
  const disclaimer =
    document.description ??
    'Document fourni par le professionnel — informations déclarées, non vérifiées.'

  return (
    <details className="rounded-lg border border-border bg-surface p-4">
      <summary className="cursor-pointer text-sm font-semibold text-text">
        {document.title}
        {document.year != null && (
          <span className="ml-2 font-normal text-text-muted">({document.year})</span>
        )}
      </summary>
      <div className="mt-3 space-y-2 text-sm text-text-muted">
        {document.institution && (
          <p>
            <span className="font-medium text-text">Établissement :</span>{' '}
            {document.institution}
          </p>
        )}
        <p className="text-xs italic">{disclaimer}</p>
        {document.documentUrl ? (
          <a
            href={document.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-primary underline"
          >
            Consulter le document
          </a>
        ) : (
          <p className="text-xs">
            Fiche consultable — aucun fichier joint en démonstration.
          </p>
        )}
      </div>
    </details>
  )
}
