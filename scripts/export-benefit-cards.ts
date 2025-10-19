import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

async function exportBenefitCards() {
  console.log('Starting benefit card export...')

  const browser = await chromium.launch()
  const page = await browser.newPage()

  // Navigate to the benefit cards page
  // Adjust URL if your dev server runs on a different port
  await page.goto('http://localhost:3001/benefit-cards', { waitUntil: 'networkidle' })

  // Wait a bit for fonts and styles to load
  await page.waitForTimeout(2000)

  const cards = [
    { name: 'clarity', index: 0 },
    { name: 'conciseness', index: 1 },
    { name: 'consistency', index: 2 },
    { name: 'empathy', index: 3 },
    { name: 'action-orientation', index: 4 },
    { name: 'accessibility', index: 5 }
  ]

  const outputDir = path.join(process.cwd(), 'public/marketing/homepage')

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  for (const card of cards) {
    console.log(`Exporting ${card.name} card...`)

    // Find the card container (the div with ref that wraps the card component)
    const cardElement = await page.locator('.grid > div').nth(card.index).locator('> div:last-child > div')

    // Take screenshot of just the card
    await cardElement.screenshot({
      path: path.join(outputDir, `benefit-${card.name}.png`),
      scale: 'device' // Use device scale for better quality
    })

    console.log(`✓ Exported ${card.name} card`)
  }

  await browser.close()
  console.log('\nAll cards exported successfully!')
  console.log(`Saved to: ${outputDir}`)
}

exportBenefitCards().catch(console.error)
