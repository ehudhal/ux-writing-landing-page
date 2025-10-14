import Image from 'next/image'

interface FeatureCardProps {
  iconSrc: string
  title: string[]
}

export default function FeatureCard({
  iconSrc: icon,
  title
}: FeatureCardProps) {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="size-16">
          <Image
            src={icon}
            alt={title[0]} // Using the first line of the title as alt text
            width={70}
            height={70}
          />
        </div>
      </div>
      <h3 className="text-xl">
        {title.map((line, index) => (
          <span key={index}>
            {line}
            {index < title.length - 1 && <br />}
          </span>
        ))}
      </h3>
    </div>
  )
}
