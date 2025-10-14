import CodeBlock from '@tiptap/extension-code-block'
import Link from '@tiptap/extension-link'
import Text from '@tiptap/extension-text'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { Markdown } from 'tiptap-markdown'
import EditorBubbleMenuBar from './editor-bubble-menu'
import EditorFloatingMenuBar from './editor-floating-menu'

const extensions = [
  StarterKit,
  Underline,
  Link,
  CodeBlock,
  Text,
  Typography,
  Markdown
]

interface EditorProps {
  content: string
  onChange: (content: string) => void
  editable?: boolean
  showFloatingMenu?: boolean
  showBubbleMenu?: boolean
  type?: 'markdown' | 'html'
  editorClassName?: string
  editorContainerClassName?: string
}

export default function Editor({
  content,
  onChange,
  editable = true,
  showFloatingMenu = true,
  showBubbleMenu = true,
  type = 'html',
  editorClassName = 'min-h-[300px] md:min-h-[400px]',
  editorContainerClassName
}: EditorProps) {
  return (
    <EditorProvider
      content={content}
      extensions={extensions}
      immediatelyRender={false}
      slotBefore={
        showFloatingMenu && <EditorFloatingMenuBar hidden={!editable} />
      }
      onUpdate={({ editor }) => {
        onChange(
          type === 'markdown'
            ? editor.storage.markdown.getMarkdown()
            : editor.getHTML()
        )
      }}
      editorContainerProps={{
        className: `p-4 bg-white w-full rounded-md border ${editorContainerClassName}`
      }}
      editorProps={{
        attributes: {
          class: `max-w-full outline-hidden prose prose-sm ${editorClassName}`
        }
      }}
    >
      {showBubbleMenu && <EditorBubbleMenuBar hidden={!editable} />}
      <DynamicContentUpdater
        content={content}
        type={type}
        editable={editable}
      />
    </EditorProvider>
  )
}

/**
 * The editor maintains its own internal state after initialization,
 * so changes to the content prop won't automatically update the editor.
 * This component syncs external content changes (e.g. from cancel/reset)
 * back into the editor's internal state.
 */
const DynamicContentUpdater = ({
  content,
  type = 'html',
  editable
}: {
  content: string
  type?: 'markdown' | 'html'
  editable: boolean
}) => {
  const { editor } = useCurrentEditor()

  useEffect(() => {
    const editorContent =
      type === 'markdown'
        ? editor?.storage.markdown.getMarkdown()
        : editor?.getHTML()
    if (editor && content !== editorContent) {
      editor.commands.setContent(content)
    }

    editor?.setEditable(editable)
  }, [content, editor, type, editable])

  return null
}
