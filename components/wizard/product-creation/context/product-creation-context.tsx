'use client'
import { createContext, ReactNode, useContext, useState } from 'react'

import { InsightType, ProductInsights } from '@/lib/types/product-insights'

export interface ProductData {
  title: string
  productInsights: ProductInsights
  productId?: string
}

export const initialProductData: ProductData = {
  title: '',
  productInsights: {
    [InsightType.OVERVIEW]: { content: '' },
    [InsightType.USER_PERSONAS]: { content: '' },
    [InsightType.BUSINESS_ASPECTS]: { content: '' }
  }
}

export interface ProductCreationContextType {
  productData: ProductData
  setProductData: (data: ProductData) => void
}

export const ProductCreationContext = createContext<ProductCreationContextType>(
  {
    productData: initialProductData,
    setProductData: () => {}
  }
)

export function ProductCreationProvider({ children }: { children: ReactNode }) {
  const [productData, setProductData] = useState(initialProductData)

  const value: ProductCreationContextType = {
    productData,
    setProductData
  }

  return (
    <ProductCreationContext.Provider value={value}>
      {children}
    </ProductCreationContext.Provider>
  )
}

export function useProductCreationContext() {
  const context = useContext(ProductCreationContext)
  if (!context) {
    throw new Error(
      'useProductCreationContext must be used within an ProductCreationProvider'
    )
  }
  return context
}
