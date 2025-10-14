import { UniqueIdentifier } from '@dnd-kit/core'
import { ReactElement } from 'react'

export interface SortableItemType {
  id: UniqueIdentifier
  component: ReactElement
}
