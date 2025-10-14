import ScreenArtifact from './screen-artifact'

export type ChangeItem = {
  designId: string
  itemId: string
  title: string
  storyInstanceId?: string
  screenInstanceId: string
}

export interface Changes {
  added: ChangeItem[]
  removed: ChangeItem[]
  updated: ChangeItem[]
}

export default function ScreenArtifactsChanges({
  changes,
  entityName,
  createItemLink
}: {
  changes: Changes
  entityName: string
  createItemLink: (item: ChangeItem) => string
}) {
  const artifacts = changes.added.concat(changes.updated)
  return (
    <div>
      {artifacts.length > 0 && (
        <section className="pb-4">
          {artifacts.map((artifact, index) => (
            <div className="mb-2" key={index}>
              <ScreenArtifact item={artifact} link={createItemLink(artifact)} />
            </div>
          ))}
        </section>
      )}

      {changes.removed.length > 0 && (
        <section className="pb-4 pt-2">
          <h2 className="pb-2 ">Removed {entityName}: </h2>
          <ul className="list-disc pl-5">
            {changes.removed.map((item, index) => (
              <li key={index} className="px-1 pb-1">
                <h3>{item.title}</h3>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
