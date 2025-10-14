import { MemoizedReactMarkdown } from '@/components/markdown'
import contentAbout from '@/content/library/about.json'
import contentHomepage from '@/content/library/homepage.json'
import contentPartnership from '@/content/library/partnership.json'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import './markdown-style.css'

const contentMap = {
  homepage: contentHomepage,
  about: contentAbout,
  partnership: contentPartnership
}

type KeyOfContent<T extends object> =
  | (keyof T & string)
  | `${keyof T & string}.${string}`

type ContentProps<T extends object> = {
  contentKey: KeyOfContent<T>
  origin: keyof typeof contentMap
}
export default function Content<T extends object>({
  contentKey,
  origin
}: ContentProps<T>) {
  const content = getContent(contentKey, origin)

  return (
    <MemoizedReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        p: ({ node, ...props }) => {
          return (
            <>
              {props.children}
              <br />
            </>
          )
        }
      }}
    >
      {content}
    </MemoizedReactMarkdown>
  )
}

function getContent<T extends object>(
  key: KeyOfContent<T>,
  origin: keyof typeof contentMap
) {
  const keys = key.split('.')
  let value: any = contentMap[origin]

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return '' // Return empty string if the key path is invalid
    }
  }

  return typeof value === 'string' ? value : ''
}
