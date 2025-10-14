import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { Message } from 'ai'
import { AnimatePresence, motion } from 'framer-motion'
import { useChatOwnerId } from '../chat/hooks/use-chat-owner'
import { IconPRDKitBlack } from '../ui/icons'
import {
    CurrentUserAvatar,
    DefaultUserAvatar,
    OrganizationUserAvatar
} from '../user-avatar'

export function ChatMessageAvatar({
  message,
  invisible
}: {
  message: Message
  invisible?: boolean
}) {
  const chatOwnerId = useChatOwnerId()
  const { user } = useUser()

  if (message.role === 'assistant') {
    return <AssistantAvatar invisible={invisible} />
  }

  const isChatOwner = user?.id === chatOwnerId

  return (
    <div
      className={cn(
        'flex size-6 shrink-0 select-none items-center justify-center rounded-full border bg-background',
        invisible && 'opacity-0'
      )}
    >
      <AnimatePresence mode="wait">
        {user ? (
          <motion.div
            key="user-avatar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {!isChatOwner ? (
              <OrganizationUserAvatar
                userId={chatOwnerId}
                className={cn('size-6', invisible && 'opacity-0')}
              />
            ) : (
              <CurrentUserAvatar
                className={cn('size-6', invisible && 'opacity-0')}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="default-avatar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DefaultUserAvatar
              className={cn(
                'flex size-7 items-center justify-center md:size-4',
                invisible && 'opacity-0'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AssistantAvatar = ({ invisible }: { invisible?: boolean }) => {
  return (
    <div
      className={cn(
        'flex shrink-0 select-none items-center justify-center',
        invisible && 'opacity-0'
      )}
    >
      <IconPRDKitBlack className="size-7" />
    </div>
  )
}
