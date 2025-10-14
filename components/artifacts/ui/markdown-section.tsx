import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const MarkdownSection = ({ content }: { content: string | null }) => {
  if (!content?.trim()) return null

  return (
    <div className="prose max-w-full text-sm text-gray-700">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          ol: props => <ol className="list-decimal pl-4" {...props} />,
          ul: props => <ul className="list-disc pl-4" {...props} />
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
