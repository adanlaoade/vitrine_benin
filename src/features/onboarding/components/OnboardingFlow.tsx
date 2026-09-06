import { useState } from 'react'
import { AccountTypeChoice } from '@/features/onboarding/components/AccountTypeChoice'
import { BusinessRegistrationForm } from '@/features/onboarding/components/BusinessRegistrationForm'
import { IndividualRegistrationForm } from '@/features/onboarding/components/IndividualRegistrationForm'
import { accountTypeLabel } from '@/lib/validation'
import type { AccountType, Professional } from '@/types'

interface OnboardingFlowProps {
  onComplete: (profile: Professional) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [accountType, setAccountType] = useState<AccountType | null>(null)

  if (!accountType) {
    return <AccountTypeChoice onSelect={setAccountType} />
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-primary">
        {accountTypeLabel(accountType)}
      </p>
      {accountType === 'individual' ? (
        <IndividualRegistrationForm
          onSuccess={onComplete}
          onBack={() => setAccountType(null)}
        />
      ) : (
        <BusinessRegistrationForm
          onSuccess={onComplete}
          onBack={() => setAccountType(null)}
        />
      )}
    </div>
  )
}
