export interface ImageScreenshot {
  imageId: string
  imageType?: 'png' | 'jpeg'
  description: string
}

export interface ImagesScreenshotsContent {
  designId: string
  imagesProcessedResult: ImageScreenshot[]
  description: string
}
