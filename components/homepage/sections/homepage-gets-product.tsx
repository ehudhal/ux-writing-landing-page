import Content from '@/content/content'

export default function HomepageGetsProduct() {
  return (
    <section className="bg-[#F1F1EA] py-20 pt-32 -mt-6 md:-mt-16">
      <div className="mx-auto max-w-[1024px] flex flex-col gap-4 md:px-0 px-8">
        <h2 className="text-2xl md:text-4xl font-serif font-light text-center">
          <Content contentKey="gets-product.title" />
        </h2>
        <p className="text-base md:text-lg font-light text-center max-w-[600px] mx-auto">
          <Content contentKey="gets-product.description" />
        </p>
      </div>
    </section>
  )
}
