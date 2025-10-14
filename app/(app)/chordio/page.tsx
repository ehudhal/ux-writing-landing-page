import { ContentOriginProvider } from '@/content/content-origin-context'
import HomepageFooter from '@/components/homepage/homepage-footer'
import HomepageHeader from '@/components/homepage/homepage-header'
import HomepageEnhancedPRDClarity from '@/components/homepage/sections/homepage-enhanced-prd-clarity'
import HomepagePRDInWorkflow from '@/components/homepage/sections/homepage-prd-in-workflow'
import HomepagePrivacy from '@/components/homepage/sections/homepage-privacy'
import HomepageSecondaryCta from '@/components/homepage/sections/homepage-secondary-cta'
import HomepageSpecFeaturesForExistingProduct from '@/components/homepage/sections/homepage-spec-features-for-existing-product'
import HomepageUltimatePRD from '@/components/homepage/sections/homepage-ultimate-prd'
import HomepageWorksWhere from '@/components/homepage/sections/homepage-works-where'
import SimpleHomeHero from '@/components/homepage/simple-home-hero'

export default function ChordioVariantPage() {
  return (
    <ContentOriginProvider origin="homepage-chordio">
      <div className="bg-[#FDFDFC] max-h-[100dvh] flex-1 h-screen overflow-y-auto flex flex-col justify-between overflow-x-hidden scroll-smooth">
        <HomepageHeader />
        <SimpleHomeHero />
        <HomepageUltimatePRD />
        <HomepageEnhancedPRDClarity />
        <HomepagePRDInWorkflow />
        <HomepageSpecFeaturesForExistingProduct />
        <HomepagePrivacy />
        <HomepageWorksWhere />
        <HomepageSecondaryCta />
        <HomepageFooter />
      </div>
    </ContentOriginProvider>
  )
}
