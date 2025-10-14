'use client'

import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'

import { ChartContainer } from '@/components/ui/chart'

interface SmallRadialChartProps {
  value: number
  maxValue: number
  barSize?: number
  barColor?: string
}

export default function SmallRadialChart({
  value,
  maxValue,
  barColor = 'hsl(var(--primary))',
  barSize = 3
}: SmallRadialChartProps) {
  const MAX_VALUE = maxValue
  const CURRENT_VALUE = value

  const chartData = [{ value: CURRENT_VALUE, fill: barColor }]

  return (
    <ChartContainer
      config={{
        value: {
          label: 'Value',
          color: barColor
        }
      }}
      className="size-10" // 2.5rem
    >
      <RadialBarChart
        width={40}
        height={40}
        cx={20}
        cy={20}
        innerRadius={12}
        outerRadius={20}
        barSize={barSize}
        data={chartData}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, MAX_VALUE]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          dataKey="value"
          cornerRadius={2}
          fill="hsl(var(--primary))"
        />
        <circle
          cx={20}
          cy={20}
          r={16}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={0}
        />
        <text
          x={20}
          y={20}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-primary text-[10px] font-medium "
        >
          {CURRENT_VALUE}
        </text>
      </RadialBarChart>
    </ChartContainer>
  )
}
