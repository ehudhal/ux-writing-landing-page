import { useQuery } from '@tanstack/react-query'
import { getArtifactStatus } from '../actions/artifact-actions'
import { GenerationStatus } from '../db-schema/artifacts'

export function useArtifactGenerationStatus(artifactId: string) {
  const { data: artifactStatus } = useQuery({
    queryKey: ['artifactStatus', artifactId],
    queryFn: () => getArtifactStatus(artifactId),
    enabled: !!artifactId,
    retry: 10,
    refetchInterval: query => {
      const data = query.state.data
      if (typeof data === 'object' && 'error' in data) {
        return false
      }

      const status = data as GenerationStatus
      return status === GenerationStatus.CAPTURE_FAILED ||
        status === GenerationStatus.COMPLETED
        ? false
        : 5000
    },
    refetchOnWindowFocus: false
  })

  if (
    (typeof artifactStatus === 'object' && 'error' in artifactStatus) ||
    !artifactStatus
  ) {
    return null
  }

  return artifactStatus
}
