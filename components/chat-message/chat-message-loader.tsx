import { Message } from 'ai'
import styles from './chat-message-loader.module.css'

export function ChatMessageLoader({ message }: { message: Message }) {
  return (
    <div
      key={`${message.id}-${message.role}-loading`}
      className={`mt-3 flex items-center gap-2 md:mt-4 ${styles.loader}`}
    ></div>
  )
}
