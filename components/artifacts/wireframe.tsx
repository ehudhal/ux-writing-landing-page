export default function Wireframe({ content }: { content: string }) {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <div
        className={
          'border-none bg-[#F9F9FB] w-full flex origin-top-left sm:origin-center '
        }
        title="Wireframe Preview"
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    </div>
  )
}
