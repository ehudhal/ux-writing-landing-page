import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { MemoizedReactMarkdown } from '../markdown'

export function ChatMessageMarkdown({
  messageContent
}: {
  messageContent: string
}) {
  return (
    <div className="prose whitespace-normal break-words text-base dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-gray-800 max-w-full">
      <MemoizedReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <p className="whitespace-pre-wrap">{children}</p>
          }
        }}
      >
        {messageContent}
      </MemoizedReactMarkdown>
    </div>
  )
}
