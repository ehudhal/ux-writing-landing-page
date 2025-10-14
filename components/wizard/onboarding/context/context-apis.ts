import { OnboardingStatus } from './onboarding-context-types'

export async function fetchOnboardingStatus(): Promise<OnboardingStatus> {
  const res = await fetch(`/api/onboarding-status`)
  if (!res.ok) throw new Error('Failed to fetch onboarding status')
  return res.json() as Promise<OnboardingStatus>
}

export async function updateOnboardingStatusApi(
  stepStatuses: Record<string, any>
) {
  const res = await fetch('/api/onboarding-status', {
    method: 'POST',
    body: JSON.stringify({
      stepStatuses
    })
  })

  if (!res.ok) {
    throw new Error('Failed to update onboarding status')
  }
}
