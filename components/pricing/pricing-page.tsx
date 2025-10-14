import Plans from './plans'

export default function PricingPage() {
  return (
    <div className="flex flex-col bg-offwhite text-offblack h-full">
      <main className="w-full">
        <div className="max-w-5xl mx-auto w-full px-4 py-16">
          <h1 className="text-5xl text-center font-light mb-12 font-serif">
            Pricing
          </h1>
          <Plans />
        </div>
      </main>
    </div>
  )
}
