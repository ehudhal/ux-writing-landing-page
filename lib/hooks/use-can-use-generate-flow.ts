import { useUser } from '@clerk/nextjs'

export function useCanUseGenerateflow() {
  const { user } = useUser()
  return user?.publicMetadata?.canCreateDesign || false
}
