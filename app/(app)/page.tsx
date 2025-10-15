import { ContentOriginProvider } from '@/content/content-origin-context'
import HomepageFooter from '@/components/homepage/homepage-footer'
import HomepageHeader from '@/components/homepage/homepage-header'
// import ProductHuntBanner from '@/components/homepage/product-hunt-banner'
import HomepageChallenges from '@/components/homepage/sections/homepage-challenges'
import HomepageEnhancedPRDClarity from '@/components/homepage/sections/homepage-enhanced-prd-clarity'
import HomepageFAQ from '@/components/homepage/sections/homepage-faq'
import HomepagePRDInWorkflow from '@/components/homepage/sections/homepage-prd-in-workflow'
import HomepagePrivacy from '@/components/homepage/sections/homepage-privacy'
import HomepageSecondaryCta from '@/components/homepage/sections/homepage-secondary-cta'
import HomepageSpecFeaturesForExistingProduct from '@/components/homepage/sections/homepage-spec-features-for-existing-product'
import HomepageUltimatePRD from '@/components/homepage/sections/homepage-ultimate-prd'
import HomepageWorksWhere from '@/components/homepage/sections/homepage-works-where'
import SimpleHomeHero from '@/components/homepage/simple-home-hero'

export default function IndexPage() {
  return (
    <ContentOriginProvider origin="homepage">
      <div className="bg-[#FDFDFC] max-h-[100dvh] flex-1 h-screen overflow-y-auto flex flex-col justify-between overflow-x-hidden scroll-smooth">
        {/* <ProductHuntBanner /> */}
        <HomepageHeader />
        <SimpleHomeHero />
        <HomepageUltimatePRD />
        <HomepageChallenges />
        <HomepageEnhancedPRDClarity />
        <HomepagePRDInWorkflow />
        <HomepageSpecFeaturesForExistingProduct />
        <HomepagePrivacy />
        <HomepageWorksWhere />
        <HomepageFAQ />
        <HomepageSecondaryCta />
        <HomepageFooter />
      </div>
    </ContentOriginProvider>
  )
}
