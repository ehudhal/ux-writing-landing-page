import { designPageWithScreen } from '@/lib/app-routes'
import { parseMessageContent } from '@/lib/utils/parse-message-content'
import ScreenArtifactsChanges, {
  ChangeItem,
  Changes
} from '../screen-artifacts-changes'

export default function ScreensSummaryMessage({
  messageContent
}: {
  messageContent: string
}) {
  return parseMessageContent<Changes>(messageContent, changes => (
    <ScreenArtifactsChanges
      changes={changes}
      entityName="screens"
      createItemLink={(item: ChangeItem) =>
        designPageWithScreen(item.designId, item.itemId, item.screenInstanceId)
      }
    />
  ))
}
