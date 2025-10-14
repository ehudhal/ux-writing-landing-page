const ARTIFACT_TYPES = [
  { param: 'briefId', value: 'brief' },
  { param: 'flowchartId', value: 'flowchart' },
  { param: 'wireframeId', value: 'wireframe' }
]

export function getRouteProperties(
  searchParams: URLSearchParams
): Record<string, string | undefined> {
  const propertyMap: Record<string, string | undefined> = {}

  for (const { param, value } of ARTIFACT_TYPES) {
    if (searchParams.get(param)) {
      propertyMap['artifactType'] = value
      break
    }
  }

  return propertyMap
}
