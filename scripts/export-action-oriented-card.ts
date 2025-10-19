import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

async function exportActionOrientedCards() {
  console.log('Starting action-oriented cards export...')

  const browser = await chromium.launch()
  const page = await browser.newPage()

  // Navigate to the benefit cards page
  await page.goto('http://localhost:3001/benefit-cards', { waitUntil: 'networkidle' })

  // Wait for fonts and styles to load
  await page.waitForTimeout(2000)

  const outputDir = path.join(process.cwd(), 'public/marketing/homepage')

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Export first action-oriented card (index 4)
  console.log('Exporting action-oriented card 1...')
  const cardElement1 = await page.locator('.grid > div').nth(4).locator('> div:last-child > div')
  await cardElement1.screenshot({
    path: path.join(outputDir, 'benefit-action-orientation.png'),
    scale: 'device'
  })
  console.log('✓ Exported action-orientation.png')

  // Export second action-oriented card (index 5)
  console.log('Exporting action-oriented card 2...')
  const cardElement2 = await page.locator('.grid > div').nth(5).locator('> div:last-child > div')
  await cardElement2.screenshot({
    path: path.join(outputDir, 'benefit-action-orientation-2.png'),
    scale: 'device'
  })
  console.log('✓ Exported action-orientation-2.png')

  console.log(`\nBoth cards saved to: ${outputDir}`)

  await browser.close()
}

exportActionOrientedCards().catch(console.error)
