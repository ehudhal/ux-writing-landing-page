import { getDesignScreens } from '@/app/actions'
import { productPageScreenUrl } from '@/lib/app-routes'
import { Screen } from '@/lib/db-schema/screens'
import { getScreensKey } from '@/lib/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { differenceWith } from 'remeda'

export function useRevalidatingScreens(
  designId: string,
  initialData: Screen[],
  navigateToNewestScreen?: boolean
) {
  const router = useRouter()
  const query = useQuery({
    queryKey: getScreensKey(designId),
    queryFn: async () => {
      const result = await getDesignScreens(designId)
      if (result && 'error' in result) {
        return []
      }
      return result
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    initialData,
    enabled: true
  })

  if (query.data) {
    if (!navigateToNewestScreen) {
      return query
    }
    const newScreens = differenceWith(
      query.data,
      initialData,
      (screen, initial) => screen.screenId === initial.screenId
    )

    if (newScreens.length > 0) {
      const lastNewScreen = newScreens[newScreens.length - 1]
      router.push(productPageScreenUrl(designId, lastNewScreen.screenId))
    }
  }

  return query
}
