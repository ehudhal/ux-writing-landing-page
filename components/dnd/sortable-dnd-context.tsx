import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  DragOverlay
} from '@dnd-kit/core'

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { SortableItem } from './sortable-item'
import { SortableItemType } from './sortable-item-type'

export type ReorderItemsCallback = (
  initialIndex: number,
  endIndex: number
) => void

export interface DragAndDropContextProps {
  items: SortableItemType[]
  onItemReordered: ReorderItemsCallback
  disabled?: boolean
}

export function SortableDnDContext({
  items,
  disabled,
  onItemReordered
}: DragAndDropContextProps) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 200, // Delay of 200ms before dragging starts
      tolerance: 5 // Pixel tolerance for drag activation
    }
  })
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  })
  const sensors = useSensors(pointerSensor, keyboardSensor)

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext
        disabled={disabled}
        items={items.map(item => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map(item => (
          <SortableItem
            key={item.id}
            item={item}
            isActive={item.id === activeId}
          />
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <div>{items.find(item => item.id === activeId)?.component}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over != null && active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over?.id)
      if (oldIndex > -1 && newIndex > -1) {
        onItemReordered(oldIndex, newIndex)
      }
    }
    setActiveId(null)
  }
}
