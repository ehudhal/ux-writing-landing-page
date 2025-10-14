import { useIsOrgAdmin } from './use-is-org-admin'

export function useHasKnowledgeWriteAccess() {
  const isOrgAdmin = useIsOrgAdmin()
  return isOrgAdmin
}
