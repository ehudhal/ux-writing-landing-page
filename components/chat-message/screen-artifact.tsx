import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChangeItem } from './screen-artifacts-changes'

import { getScreenInstanceStatus } from '@/app/actions'
import {
  ScreenStatus,
  ScreenStatusType
} from '@/lib/db-schema/screen-instances'
import { createFileKeyForScreenInstanceId } from '@/lib/files/file-utils'
import { getScreenInstanceStatusKey } from '@/lib/query-keys'
import { useQuery } from '@tanstack/react-query'
import {
  ChevronRight,
  CircleAlert,
  CircleX,
  Loader2,
  OctagonX
} from 'lucide-react'
import useScreenInstanceStatusListener from '../designs/hooks/use-screen-instance-status-listener'
import { SignedImage } from '../images/signed-image'

const finalStatuses = [ScreenStatus.DONE, 'NOTFOUND', 'FAILED']
const isFinalStatus = (status?: ScreenStatusType | 'NOTFOUND' | 'FAILED') =>
  status ? finalStatuses.includes(status) : false

const useArtifactStatus = (screenInstanceId: string) => {
  const { generationStatus } = useScreenInstanceStatusListener(screenInstanceId)

  return useQuery({
    queryKey: getScreenInstanceStatusKey(screenInstanceId),
    queryFn: () => getScreenInstanceStatus(screenInstanceId),
    refetchInterval: ({ state }) => {
      if (isFinalStatus(generationStatus)) {
        return 0
      } else {
        return isFinalStatus(state.data?.status) ? 0 : 5000
      }
    }
  })
}

export default function ScreenArtifact({
  item,
  link
}: {
  link: string
  item: ChangeItem
}) {
  const { data: artifactStatus, isLoading } = useArtifactStatus(
    item.screenInstanceId
  )

  const status = artifactStatus?.status

  const generating = status === ScreenStatus.GENERATING || isLoading

  const done = status === ScreenStatus.DONE

  const notfound = status === 'NOTFOUND'

  const failed = status === ScreenStatus.FAILED

  return (
    <Link
      className={cn(
        'flex h-16 w-full items-center rounded-lg border  border-gray-200 bg-white opacity-100 transition-opacity',
        {
          'opacity-50 pointer-events-none': notfound,
          'opacity-50': isLoading || failed
        }
      )}
      key={item.designId}
      href={link}
    >
      {item.screenInstanceId && (
        <div className="flex h-full w-[64px] min-w-[64px] items-center justify-center rounded-md bg-gray-50 p-1">
          {done && (
            <SignedImage
              alt={item.title}
              src={createFileKeyForScreenInstanceId(item.screenInstanceId)}
              width="100%"
              className="rounded-md object-contain"
            />
          )}
          {!done && !generating && (
            <div className="flex h-full w-[64px] min-w-[64px] items-center justify-center rounded-md bg-gray-50 p-1">
              <span className="text-sm text-gray-500">
                <OctagonX strokeWidth={1} className="stroke-primary/50" />
              </span>
            </div>
          )}
          {generating && (
            <div className="flex h-full w-[64px] min-w-[64px] items-center justify-center rounded-md bg-gray-50 p-1">
              <span className="text-sm text-gray-500">
                <Loader2 size={20} strokeWidth={1} className="animate-spin" />
              </span>
            </div>
          )}
        </div>
      )}

      <div className="ml-4 p-2">
        <h2 className="text-base">{item.title}</h2>
      </div>

      {done ||
        (generating && (
          <div className="ml-auto p-2 opacity-0  group-hover:opacity-100">
            <ChevronRight size={20} strokeWidth={1} />
          </div>
        ))}
      {notfound && (
        <div className="ml-auto flex items-center gap-2 p-4 ">
          <CircleAlert size={20} strokeWidth={1} className="stroke-gray-500" />
          <span className="text-sm text-gray-500 ">Artifact not found</span>
        </div>
      )}
      {failed && (
        <div className="ml-auto flex items-center gap-2 p-4 ">
          <CircleX size={20} strokeWidth={1} className="stroke-gray-500" />
          <span className="text-sm text-gray-500 ">Generation failed</span>
        </div>
      )}
    </Link>
  )
}
