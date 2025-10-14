'use client'
import Editor from '@/components/editor/editor'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  createProduct,
  updateProductDetails
} from '@/lib/actions/product-actions'
import { productPageUrl } from '@/lib/app-routes'
import { InsightType } from '@/lib/types/product-insights'
import { AnimatePresence, motion } from 'framer-motion'
import { ChartColumnIcon, LayoutDashboardIcon, UsersIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  cardVariants,
  containerVariants,
  itemVariants,
  tabContentVariants
} from '../../infra/animations/shared-animations'
import { WizardStepProps } from '../../infra/types'
import { ProductCreationTemplate } from '../components/product-creation-template'
import { useProductCreationContext } from '../context/product-creation-context'
export function ProductDetailsStep(stepProps: WizardStepProps) {
  const { productData, setProductData } = useProductCreationContext()
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()
  //
  //
  // Define the tabs and their corresponding insight types
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboardIcon className="w-4 h-4" />,
      insightType: 'overview' as InsightType
    },
    {
      id: 'personas',
      label: 'User personas',
      icon: <UsersIcon className="w-4 h-4" />,
      insightType: 'userPersonas' as InsightType
    },
    {
      id: 'business',
      label: 'Business aspects',
      icon: <ChartColumnIcon className="w-4 h-4" />,
      insightType: 'businessAspects' as InsightType
    }
  ]

  const handleSubmit = () => {
    const { title, productInsights, productId } = productData
    if (!title || Object.values(productInsights).length === 0) {
      toast.error('Title and sections are required')
      return
    }

    startTransition(async () => {
      try {
        const result = productId
          ? await updateProductDetails(productId, title, productInsights)
          : await createProduct(title, productInsights)
        if (result && 'error' in result) {
          toast.error(result.error)
          return
        }

        setProductData({ ...productData, productId: result.productId })
        router.prefetch(productPageUrl(result.productId))
        stepProps.onComplete()
      } catch {
        toast.error('Failed to create product')
      }
    })
  }

  return (
    <ProductCreationTemplate
      {...stepProps}
      isPending={isPending}
      onComplete={handleSubmit}
      primaryButtonConfig={{
        text: 'Create Product'
      }}
    >
      <motion.div
        className="flex flex-col h-full relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-sm text-muted-foreground mb-4"
          variants={itemVariants}
        >
          Add information about your product to get personalized, accurate
          insights.
        </motion.p>
        <motion.div
          className="rounded-lg border bg-card p-2 mb-4"
          variants={cardVariants}
        >
          <motion.div variants={itemVariants}>
            <Input
              className="p-x2 py-4 rounded-md shadow-none bg-transparent text-md font-semibold"
              value={productData.title}
              onChange={e => {
                setProductData({
                  ...productData,
                  title: e.target.value
                })
              }}
              placeholder="Untitled Product"
            />
          </motion.div>

          <Tabs
            defaultValue="overview"
            className="w-full mt-4"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <motion.div variants={itemVariants}>
              <TabsList className="grid grid-cols-3 bg-background rounded-md h-20 lg:h-10 border overflow-hidden">
                {tabs.map(tab => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center justify-center gap-2 rounded-md text-muted-foreground text-sm h-full px-2
                     data-[state=active]:bg-gray-100 data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    <motion.div
                      className="hidden lg:block"
                      initial={{ scale: 1 }}
                      animate={{
                        scale: activeTab === tab.id ? [1, 1.2, 1] : 1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {tab.icon}
                    </motion.div>

                    <div className="w-full text-center text-sm">
                      <span className="hidden lg:block ">{tab.label}</span>
                      <span className="block lg:hidden whitespace-pre-line leading-tight">
                        {tab.label}
                      </span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {tabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6 px-1">
                {tab.id === activeTab && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab.id}
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Editor
                        content={
                          productData.productInsights[tab.insightType]
                            ?.content || ''
                        }
                        onChange={content => {
                          setProductData({
                            ...productData,
                            productInsights: {
                              ...productData.productInsights,
                              [tab.insightType]: { content }
                            }
                          })
                        }}
                        type="markdown"
                        showFloatingMenu={false}
                        showBubbleMenu={true}
                        editorClassName="h-[320px] focus:outline-none overflow-y-auto"
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </motion.div>
    </ProductCreationTemplate>
  )
}
