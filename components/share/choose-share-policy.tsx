import { SharePolicy, SharePolicyType } from '@/lib/db-schema/designs'
import { useOrganization } from '@clerk/nextjs'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

export default function ChooseSharePolicy({
  onUpdateSharePolicy,
  sharePolicy
}: {
  onUpdateSharePolicy: (policy: SharePolicyType) => void
  sharePolicy: SharePolicyType
}) {
  const { organization } = useOrganization()

  if (!organization) {
    return null
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-1">
        <Label htmlFor="share-policy-group">Access</Label>
        <RadioGroup
          defaultValue={sharePolicy}
          onValueChange={onUpdateSharePolicy}
          className="flex flex-col gap-4"
          id="share-policy-group"
        >
          <div className="flex cursor-pointer items-center space-x-2">
            <RadioGroupItem
              value={SharePolicy.PRIVATE}
              id={SharePolicy.PRIVATE}
              className="cursor-pointer"
            />
            <Label htmlFor={SharePolicy.PRIVATE} className="cursor-pointer">
              Only you can view
            </Label>
          </div>
          <div className="flex cursor-pointer items-center space-x-2">
            <RadioGroupItem
              value={SharePolicy.ALL_MEMBERS_VIEW}
              id={SharePolicy.ALL_MEMBERS_VIEW}
              className="cursor-pointer"
            />
            <Label
              htmlFor={SharePolicy.ALL_MEMBERS_VIEW}
              className="cursor-pointer"
            >
              Anyone in {organization.name} can view
            </Label>
          </div>
        </RadioGroup>
      </div>
    </>
  )
}
