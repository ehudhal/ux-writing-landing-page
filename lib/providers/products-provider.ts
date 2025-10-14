import { ERROR_CONSTANTS } from '../constants/error-constants'
import { Screen } from '../db-schema/screens'
import * as designsService from '../services/designs-service'
import * as productsService from '../services/products-service'

import { getScreens } from '../services/screens-service'

const { NOTFOUND } = ERROR_CONSTANTS

export async function provideProductWithScreensAndPreviews(productId: string) {
  const product =
    await productsService.getProductWithScreensAndPreviews(productId)
  if (!product) {
    return {
      error: NOTFOUND
    }
  }

  return product
}

export async function provideProductScreens(
  productId: string
): Promise<ProductScreensResult> {
  const screens = await getScreens(productId)
  return {
    screenshots: screens.filter(s => !s.primaryInstanceId),
    capturedScreens: screens.filter(s => s.primaryInstanceId)
  }
}

export async function provideProductWithScreensAndLogo(productId: string) {
  const product = await provideProductWithScreensAndPreviews(productId)
  if ('error' in product) {
    return product
  }

  const { logoUrl } = await productsService.getProductLogoUrl(product)
  return {
    ...product,
    logoUrl
  }
}

export async function providePublishedProducts(orgId: string) {
  return productsService.getPublishedProducts(orgId)
}

export async function provideProductsWithLogos(userId: string, orgId: string) {
  const products = await productsService.getOrganizationProducts({
    orgId,
    userId
  })
  if ('error' in products) {
    return products
  }
  const productsWithLogos = await Promise.all(
    products.map(async p => {
      const { logoUrl } = await productsService.getProductLogoUrl(p)
      return {
        ...p,
        logoUrl
      }
    })
  )

  return productsWithLogos
}

export async function provideProductForDesign(orgId: string, designId: string) {
  const design = await designsService.getDesign(designId)
  if (!design || !design.parentId) {
    return null
  }
  const product = await productsService.getProduct(design.parentId, orgId)
  if (!product) {
    return null
  }

  const { logoUrl } = await productsService.getProductLogoUrl(product)
  return {
    ...product,
    logoUrl
  }
}

export async function provideDesignsByProductId(productId: string) {
  const designs = await productsService.getProductDesigns(productId)
  return designs
}

export type ProductScreensResult = {
  screenshots: Array<Screen> // Screens without primaryInstanceId
  capturedScreens: Array<Screen> // Screens with primaryInstanceId
}
