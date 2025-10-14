import { cn } from '@/lib/utils'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import MenuButton from './editor-menu-button'

export default function EditorBubbleMenuBar({
  hidden = false
}: {
  hidden?: boolean
}) {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <BubbleMenu
      editor={editor}
      className={cn(
        'mt-2 flex space-x-2 rounded-md border border-gray-300 bg-white p-2 shadow-sm',
        {
          hidden
        }
      )}
    >
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        icon={BoldIcon}
        tooltip="Bold"
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        icon={ItalicIcon}
        tooltip="Italic"
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        icon={UnderlineIcon}
        tooltip="Underline"
      />
    </BubbleMenu>
  )
}
