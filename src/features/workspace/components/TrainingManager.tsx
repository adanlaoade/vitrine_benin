import { useState } from 'react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { FieldWrapper, TextArea, TextInput } from '@/features/onboarding/components/FormFields'
import type { TrainingDocument } from '@/types'

interface TrainingManagerProps {
  documents: TrainingDocument[]
  onChange: (documents: TrainingDocument[]) => void
}

export function TrainingManager({ documents, onChange }: TrainingManagerProps) {
  const [title, setTitle] = useState('')
  const [institution, setInstitution] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')

  function addDocument() {
    if (!title.trim()) return
    const doc: TrainingDocument = {
      id: `td-${Date.now()}`,
      title: title.trim(),
      institution: institution.trim() || undefined,
      year: year ? Number(year) : undefined,
      description: description.trim() || 'Informations déclarées par le professionnel.',
    }
    onChange([...documents, doc])
    setTitle('')
    setInstitution('')
    setYear('')
    setDescription('')
  }

  function removeDocument(id: string) {
    onChange(documents.filter((d) => d.id !== id))
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-text-muted">
        Documents consultables sur votre profil public — libellé « Document fourni
        par le professionnel », jamais « vérifié ».
      </p>

      {documents.length > 0 && (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-start justify-between gap-3 rounded-md border border-border bg-surface p-3"
            >
              <div>
                <p className="text-sm font-medium text-text">{doc.title}</p>
                {(doc.institution || doc.year) && (
                  <p className="mt-0.5 text-xs text-text-muted">
                    {[doc.institution, doc.year].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeDocument(doc.id)}
                className="shrink-0 text-xs text-danger hover:underline"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-3 rounded-md border border-dashed border-border p-3">
        <FieldWrapper label="Intitulé du diplôme / formation">
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Certificat de plomberie"
          />
        </FieldWrapper>
        <FieldWrapper label="Établissement">
          <TextInput
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Ex. CFP Godomey"
          />
        </FieldWrapper>
        <FieldWrapper label="Année">
          <TextInput
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2019"
            min={1950}
            max={2100}
          />
        </FieldWrapper>
        <FieldWrapper label="Description">
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Informations complémentaires…"
          />
        </FieldWrapper>
        <PrimaryButton
          type="button"
          variant="secondary"
          fullWidth
          onClick={addDocument}
          disabled={!title.trim()}
        >
          Ajouter une formation
        </PrimaryButton>
      </div>
    </div>
  )
}
