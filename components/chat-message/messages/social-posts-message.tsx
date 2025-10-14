import { useDisplayColumnParam } from '@/components/permanent-chat/display/use-display-column-param'
import { PlatformIcon } from '@/components/platform-icon'
import { Tool } from '@/lib/chat/tools/tool-types'
import { ArtifactType } from '@/lib/db-schema/artifacts'
import { WithoutError } from '@/lib/types'
import { cn } from '@/lib/utils'
import { parseMessageContent } from '@/lib/utils/parse-message-content'
export type SocialPostsMessageContent = NonNullable<
  WithoutError<Tool<'generateSocialPosts'>['result']>
>

export function SocialPostsMessage({
  messageContent
}: {
  messageContent: string
}) {
  const { setDisplayParam, displayParam } = useDisplayColumnParam()

  return parseMessageContent<SocialPostsMessageContent>(
    messageContent,
    ({ socialPostsGroupId, socialPosts }) => {
      const postsSummary =
        socialPosts?.posts?.length > 0
          ? `${socialPosts.posts.length} posts generated`
          : 'No posts generated yet'
      const isActive = displayParam === socialPostsGroupId

      return (
        <button
          onClick={() =>
            setDisplayParam(ArtifactType.SOCIAL_POSTS, socialPostsGroupId)
          }
          className="w-full"
        >
          <div
            className={cn(
              'flex w-full items-center rounded-lg border border-gray-200 bg-white p-4 text-sm text-offblack shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-100',
              {
                'border-offblack': isActive
              }
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <PlatformIcon
                  platform={socialPosts.posts[0].platform}
                  className="mr-2"
                />
                <h3 className="font-medium">
                  {socialPosts.posts[0].platform} Social Posts
                </h3>
              </div>
              <p className="text-gray-500 line-clamp-2 text-left">
                {postsSummary}
              </p>
            </div>
          </div>
        </button>
      )
    }
  )
}
