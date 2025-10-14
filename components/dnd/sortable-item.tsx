import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableItemType } from './sortable-item-type'

export interface SortablItemProps {
  item: SortableItemType
  isActive: boolean
}

export function SortableItem({ item, isActive }: SortablItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    visibility: isActive ? 'hidden' : 'visible'
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.component}
    </div>
  )
}
