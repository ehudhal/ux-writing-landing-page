'use client'
import Editor from '@/components/editor/editor'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  createProduct,
  updateProductDetails
} from '@/lib/actions/product-actions'
import { InsightType } from '@/lib/types/product-insights'
import { AnimatePresence, motion } from 'framer-motion'
import { ChartColumnIcon, LayoutDashboardIcon, UsersIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  cardVariants,
  containerVariants,
  itemVariants,
  tabContentVariants
} from '../../infra/animations/shared-animations'
import { WizardStepProps } from '../../infra/types'
import { OnboardingTemplate } from '../components/onboarding-template'
import { useOnboardingContext } from '../context/onboarding-context'

export function ProductDetailsStep(stepProps: WizardStepProps) {
  const { productContext } = useOnboardingContext()
  const { productData, setProductData } = productContext
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState('overview')

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
      label: 'User Personas',
      icon: <UsersIcon className="w-4 h-4" />,
      insightType: 'userPersonas' as InsightType
    },
    {
      id: 'business',
      label: 'Business Aspects',
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
        stepProps.onComplete()
      } catch {
        toast.error('Failed to create product')
      }
    })
  }

  return (
    <OnboardingTemplate
      {...stepProps}
      isPending={isPending}
      onComplete={handleSubmit}
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
              <TabsList className="grid grid-cols-3 bg-background rounded-md h-10 border">
                {tabs.map(tab => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center justify-center gap-2 rounded-md text-muted-foreground text-sm
                     data-[state=active]:bg-gray-100 data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{
                        scale: activeTab === tab.id ? [1, 1.2, 1] : 1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {tab.icon}
                    </motion.div>
                    {tab.label}
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
    </OnboardingTemplate>
  )
}
