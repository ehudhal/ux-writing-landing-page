import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

async function exportHeroComposite() {
  console.log('Starting hero composite export...')

  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 1400, height: 800 }
  })

  // Navigate to the composite page
  await page.goto('http://localhost:3001/benefit-cards-composite', {
    waitUntil: 'networkidle'
  })

  // Wait for fonts and styles to load
  await page.waitForTimeout(2000)

  const outputDir = path.join(process.cwd(), 'public/marketing/homepage')

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  console.log('Capturing hero composite...')

  // Take screenshot of the entire visible area
  await page.screenshot({
    path: path.join(outputDir, 'hero-benefit-cards-composite.png'),
    scale: 'device',
    fullPage: false
  })

  console.log('✓ Exported hero-benefit-cards-composite.png')
  console.log(`Saved to: ${path.join(outputDir, 'hero-benefit-cards-composite.png')}`)

  await browser.close()
}

exportHeroComposite().catch(console.error)
