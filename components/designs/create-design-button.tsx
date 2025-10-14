'use client'
import { createNewDesign } from '@/app/actions'

import { LocalStorage } from '@/lib/localstorage'
import { useAuth } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { designPageUrl } from '@/lib/app-routes'
import { SELECTED_PRODUCT_KEY } from '@/lib/constants/local-storage'

export default function CreateDesignButton() {
  const { userId } = useAuth()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const derivedFromProductId = LocalStorage.getItem<string>(
    SELECTED_PRODUCT_KEY,
    userId ?? null
  )
  const handleCreateDesign = async () => {
    startTransition(async () => {
      toast.info('Creating chat...')
      const result = await createNewDesign({
        parentId: derivedFromProductId
      })
      if ('error' in result) {
        toast.error(result.error)
        return
      }

      router.push(designPageUrl(result.designId))
    })
  }

  return (
    <Button
      disabled={isPending}
      className="flex h-full gap-1 self-end md:gap-2"
      onClick={handleCreateDesign}
    >
      <Plus strokeWidth={1} />
      <span className="hidden md:block pr-3">New PRD</span>
      <span className="block md:hidden">Create</span>
    </Button>
  )
}
