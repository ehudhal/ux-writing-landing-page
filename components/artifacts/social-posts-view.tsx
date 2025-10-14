'use client'
import { SocialPost, SocialPosts } from '@/lib/chat/schemas/social-posts-schema'
import { AnimatePresence, motion } from 'framer-motion'
import { Users2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { MemoizedReactMarkdown } from '../markdown'
import { BackToChatButton } from '../permanent-chat/chat/back-to-chat-button'
import { PlatformIcon } from '../platform-icon'
import { Button } from '../ui/button'
import { IconCheck, IconCopy } from '../ui/icons'
import {
  containerVariants,
  itemVariants,
  textVariants
} from './animation-variants'

export default function SocialPostsView({
  socialPosts,
  children,
  showBackToChat = true
}: {
  socialPosts: SocialPosts
  children?: React.ReactNode
  showBackToChat?: boolean
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const tone = socialPosts.posts[0].tone
  const platform = socialPosts.posts[0].platform
  const purpose = socialPosts.posts[0].purpose

  const handleCopy = (post: SocialPost, index: number) => {
    navigator.clipboard.writeText(post.content)
    setCopiedIndex(index)
    toast.success('Copied to clipboard')
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto flex w-full max-w-4xl flex-col gap-2 overflow-y-auto p-4 md:gap-2 md:p-8"
    >
      <motion.div
        variants={itemVariants}
        className="mb-2 flex items-center justify-between gap-2"
      >
        <h1 className="flex items-center gap-2 font-serif text-lg font-medium ">
          {showBackToChat && <BackToChatButton />}

          {`Social Posts for ${purpose} with a ${tone} tone`}
        </h1>
        {children}
      </motion.div>

      <motion.section variants={itemVariants} className="">
        <motion.div
          variants={textVariants}
          className="relative p-4 flex flex-col gap-6"
        >
          {socialPosts.posts.map((post, index) => (
            <div key={index} className="relative group">
              <h3 className="mb-3 text-sm font-medium ml-3">{post.title}</h3>
              <div
                key={index}
                className=" rounded-lg border border-[#F0F0EF] bg-white p-5"
              >
                <MemoizedReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-1">{children}</p>,
                    a: ({ children, href }) => (
                      <a href={href} className="text-blue-800">
                        {children}
                      </a>
                    )
                  }}
                >
                  {replaceHashtagsWithMarkdownLinks(post.content, platform)}
                </MemoizedReactMarkdown>
              </div>

              <div className="border group-hover:border-border border-transparent p-1 absolute right-4 bottom-4 rounded-md flex items-center gap-1 transition-all duration-300">
                <AnimatePresence mode="wait">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                    onClick={() => handleCopy(post, index)}
                  >
                    <motion.div
                      variants={copyButtonVariants}
                      key={copiedIndex === index ? 'check' : 'copy'}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      {copiedIndex === index ? (
                        <IconCheck className="size-4" />
                      ) : (
                        <IconCopy />
                      )}
                    </motion.div>
                  </Button>
                </AnimatePresence>
                <div className="rounded-md  h-10 p-0 aspect-square flex items-center justify-center bg-muted">
                  <PlatformIcon
                    platform={platform}
                    fallback={<Users2 className="size-4" strokeWidth={1} />}
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  )
}

const copyButtonVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 }
}

const replaceHashtagsWithMarkdownLinks = (
  content: string,
  platform: string
) => {
  switch (platform) {
    case 'X (Twitter)':
      return content.replace(/#(\w+)/g, (match, p1) => {
        return `[${match}](https://twitter.com/hashtag/${p1})`
      })
    case 'LinkedIn':
      return content.replace(/#(\w+)/g, (match, p1) => {
        return `[${match}](https://www.linkedin.com/feed/hashtag/${p1})`
      })
    case 'Facebook':
      return content.replace(/#(\w+)/g, (match, p1) => {
        return `[${match}](https://www.facebook.com/hashtag/${p1})`
      })
    case 'Instagram':
      return content.replace(/#(\w+)/g, (match, p1) => {
        return `[${match}](https://www.instagram.com/explore/locations/${p1})`
      })
    default:
      return content
  }
}
