'use client'
import { updateScreen } from '@/app/(app)/(home)/prds/actions/update-screen'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'
import { ListItem } from './list-item'
import ScreenListItemActions from './screen-list-item-actions'

export interface ScreenListItemProps {
  designId: string
  item: ListItem
  readonly: boolean
  setOptimisticScreenId: (screenId: string) => void
}

const ScreenListItem = ({
  designId,
  item,
  readonly,
  setOptimisticScreenId
}: ScreenListItemProps) => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [editable, setEditable] = useState(false)
  const isEditableAndSelected = editable && item.isSelected
  const [title, setTitle] = useState(item.title)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditableAndSelected) {
      setTitle(e.target.value)
    }
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setEditable(true)
  }

  const handleBlur = () => {
    startTransition(async () => {
      await updateScreen(designId, item.id, { title })

      setEditable(false)
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.key === 'Enter') {
      setTitle(e.currentTarget.value)
      inputRef.current?.blur()
    }
  }

  const handleClick = () => {
    setOptimisticScreenId(item.id)
    router.push(item.link)
  }
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'flex w-full items-center justify-between gap-2 border border-y-0 border-r-0  border-transparent py-1 pl-3 text-sm text-gray-700  transition-all  focus:outline-hidden focus:ring-0 focus:ring-offset-0 focus-visible:outline-hidden  group-hover:text-gray-900 active:sborder-purple-900',
        {
          'text-gray-900  border-purple-800': item.isSelected,
          'border-purple-400': hovered
        }
      )}
    >
      <input
        ref={inputRef}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          cursor: isEditableAndSelected ? 'text' : 'pointer'
        }}
        className={cn(
          'focus-visible::border-transparent line-clamp-2  w-full border-transparent bg-transparent text-left leading-6 focus-visible:outline-hidden focus-visible:ring-0 focus-visible:ring-offset-0 ',
          {
            ' bg-white px-2 py-2 rounded-sm border-offblack border cursor-text':
              isEditableAndSelected
          }
        )}
        readOnly={!isEditableAndSelected}
        value={title}
        onChange={handleTitleChange}
      />

      {item.isSelected && item != null && !readonly && (
        <ScreenListItemActions
          onEdit={() => setEditable(true)}
          entityId={item.id}
          designId={designId!}
        />
      )}
    </div>
  )
}

export default ScreenListItem
