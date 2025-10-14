import { reorderScreens } from '@/app/(app)/(home)/prds/actions/reorder-screens'
import { SortableDnDContext } from '@/components/dnd/sortable-dnd-context'
import { SortableItemType } from '@/components/dnd/sortable-item-type'
import { getScreensKey } from '@/lib/query-keys'
import { arrayMove } from '@dnd-kit/sortable'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ListItem } from './list-item'
import ScreenListItem from './screen-list-item'

interface ScreensListProps {
  initialItems: ListItem[]
  designId: string
  selectedId: string
  setOptimisticScreenId: (screenId: string) => void
  readOnly: boolean
}

export default function ScreensList({
  initialItems,
  designId,
  setOptimisticScreenId,
  readOnly
}: ScreensListProps) {
  const [items, setItems] = useState<ListItem[]>(initialItems)
  const queryClient = useQueryClient()
  // if this component will stay after permanent chat changes we will change the state to include only ids
  // and can get rid of this useEffect
  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  const onItemReordered = async (initialIndex: number, endIndex: number) => {
    const currentItems = items
    const updatedItems = arrayMove(currentItems, initialIndex, endIndex)
    setItems(updatedItems)

    const updatedItemsOrder = updatedItems.map((item, index) => ({
      entityId: item.id.toString(),
      order: index
    }))

    const result = await reorderScreens({
      designId,
      reorderedScreens: updatedItemsOrder
    })

    if (result && 'error' in result) {
      toast.error(result.error)
      setItems(currentItems) // Revert to the previous state if the reorder fails
    }

    queryClient.invalidateQueries({
      queryKey: getScreensKey(designId)
    })
  }

  const sortableListItems: SortableItemType[] = items.map(item => ({
    id: item.id,
    component: (
      <ScreenListItem
        designId={designId}
        item={item}
        readonly={readOnly}
        setOptimisticScreenId={setOptimisticScreenId}
      />
    )
  }))

  return (
    <>
      <SortableDnDContext
        items={sortableListItems}
        onItemReordered={onItemReordered}
        disabled={readOnly}
      />
    </>
  )
}
