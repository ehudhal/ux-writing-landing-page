import { Screen } from '../db-schema/screens'

export function createFileKeyForProductLogo(productId: string): string {
  return `products/${productId}/${productId}-logo`
}

export function createFileKeyForScreen(screen: Screen): string {
  return `screens/previews/${screen.primaryInstanceId}/${screen.primaryInstanceId}-latest.jpeg`
}

export function createFileKeyForScreenInstanceId(
  screenInstanceId: string
): string {
  return `screens/previews/${screenInstanceId}/${screenInstanceId}-latest.jpeg`
}

export function createFileKeyForFlowchart(flowchartId: string) {
  return `flowcharts/${flowchartId}/preview.jpg`
}

export function createFileKeyForScreenshot(
  screenshotId: string,
  extension: string
): string {
  return `screenshots/${screenshotId}.${extension}`
}

export function createFileKeyForProductScreenshot(screenId: string): string {
  return `product-screenshots/${screenId}`
}

export function createFileKeyForWireframe(designId: string) {
  return `wireframes/${designId}.jpg`
}

export function convertArrayBufferToDataURL(
  arrayBuffer: ArrayBuffer | ArrayBufferLike
) {
  const buffer = Buffer.from(arrayBuffer)
  return `data:image/png;base64,${buffer.toString('base64')}`
}
