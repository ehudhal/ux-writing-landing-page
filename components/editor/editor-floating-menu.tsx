import { cn } from '@/lib/utils'
import { useCurrentEditor } from '@tiptap/react'
import {
  Bold as BoldIcon,
  Code as CodeIcon,
  Heading1 as H1Icon,
  Heading2 as H2Icon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon
} from 'lucide-react'
import MenuButton from './editor-menu-button'

export default function EditorFloatingMenuBar({
  hidden = false
}: {
  hidden?: boolean
}) {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className={cn('flex gap-2 py-2', { hidden })}>
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
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        icon={H1Icon}
        tooltip="Heading 1"
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        icon={H2Icon}
        tooltip="Heading 2"
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        icon={CodeIcon}
        tooltip="Code Block"
      />
    </div>
  )
}
