import { MarkdownSection } from './markdown-section'

export const BriefSection = ({
  title,
  content,
  isLast
}: {
  title: string
  content: string | null
  isLast?: boolean
}) => {
  if (!content?.trim()) return null

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-base font-medium text-gray-500">{title}</h3>
        <MarkdownSection content={content} />
      </div>
      {!isLast && <hr className="my-6 border-gray-200" />}
    </>
  )
}
