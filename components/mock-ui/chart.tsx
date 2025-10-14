'use client'
import React, { PropsWithChildren } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer
} from 'recharts'
import { z } from 'zod'

const chartPropsSchema = z.object({
  title: z.string().optional(),
  color: z.string(),
  type: z.enum(['bar', 'line', 'area']),
  height: z.string().or(z.number()),
  width: z.string().or(z.number())
})

type ChartProps = z.infer<typeof chartPropsSchema> & PropsWithChildren

const Chart = React.forwardRef(function Chart(
  props: ChartProps,
  ref: React.Ref<any>
) {
  const seed = `${props.type}-${props.height}-${props.width}-${props.color}-${props.title}`
  const data = generateRandomData(seed)

  const height = parseInt(props.height.toString().replace('px', ''))

  const { success } = chartPropsSchema.safeParse(props)
  if (!success) {
    return null
  }

  return (
    <div
      style={{
        height: height,
        width: '100%'
      }}
      ref={ref}
    >
      {charts[props.type]({ ...props, height, data })}
      {props.children}
    </div>
  )
})

Chart.displayName = 'Chart'

export default Chart

type SpecificChartProps = {
  data: { x: string; y: number }[]
} & ChartProps

const BarC = (props: SpecificChartProps) => {
  return (
    <ResponsiveContainer height={props.height} width={'100%'}>
      <BarChart data={props.data} height={100} width={200}>
        <Bar dataKey="y" fill={props.color} />
      </BarChart>
    </ResponsiveContainer>
  )
}

const LineC = (props: SpecificChartProps) => {
  return (
    <ResponsiveContainer height={props.height} width={'100%'}>
      <LineChart data={props.data}>
        <Line
          type="monotone"
          dataKey="y"
          stroke={props.color}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

const AreaC = (props: SpecificChartProps) => {
  return (
    <ResponsiveContainer height={props.height} width={'100%'}>
      <AreaChart data={props.data}>
        <Area
          type="monotone"
          dataKey="y"
          stroke={props.color}
          fill={props.color}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const charts = {
  line: LineC,
  bar: BarC,
  area: AreaC
}
const generateRandomData = (seed: string) => {
  let random = Math.sin(seed.charCodeAt(0)) * 10000
  return [...Array(10)].map((_, i) => ({
    x: `Item ${i + 1}`,
    y: Math.floor((random = Math.sin(random) * 10000) * 100)
  }))
}
