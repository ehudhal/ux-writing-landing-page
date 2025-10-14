# Homepage Variants Guide

This guide explains how to create and use homepage variants for A/B testing, regional variations, or different messaging strategies.

## How the System Works

All homepage components now use the `Content` component and JSON-based configuration, making it easy to create alternative versions by simply swapping the JSON file.

### Content Structure

The homepage content is defined in `/content/library/homepage.json` and includes:

1. **Text Content**: All copy, titles, descriptions, and CTA text
2. **Visual Assets**: Image paths, icon colors, and background colors
3. **Badges**: Special labels like "Soon" for upcoming features

### Creating a Variant

To create a new variant:

1. **Copy the base JSON file**:
   ```bash
   cp content/library/homepage.json content/library/homepage-[variant-name].json
   ```

2. **Modify the content**:
   - Update text to match your messaging
   - Change visual properties (colors, images)
   - Keep the same structure and keys

3. **Create a variant page** (optional):
   ```typescript
   // app/(app)/variant-name/page.tsx
   import HomepageFooter from '@/components/homepage/homepage-footer'
   import HomepageHeader from '@/components/homepage/homepage-header'
   // ... other imports

   export default function VariantPage() {
     return (
       <div className="bg-[#FDFDFC] max-h-[100dvh] flex-1 h-screen overflow-y-auto flex flex-col justify-between overflow-x-hidden scroll-smooth">
         <HomepageHeader />
         <SimpleHomeHero />
         <HomepageUltimatePRD />
         {/* ... other sections */}
       </div>
     )
   }
   ```

4. **Update component imports** to use your variant JSON:
   ```typescript
   // In each component file that needs the variant
   import contentHomepage from '@/content/library/homepage-[variant-name].json'
   ```

## Example Variant

See `homepage-variant-example.json` for a complete example with:
- Alternative messaging and tone
- Different color schemes
- Modified visual properties
- Same structure as the base file

### Key differences in the example:
- **Hero title**: "Transform Ideas into Specs with AI" (vs "AI-Powered Product Requirements")
- **Visual colors**: Slightly different color palette for brand differentiation
- **Tone**: More action-oriented language throughout

## Best Practices

### 1. Maintain Structure
Always keep the same JSON structure and key names. Components expect specific keys.

```json
// ✅ Good - maintains structure
{
  "enhanced-prd-clarity": {
    "wireframes": {
      "title": "Visual Mockups",
      "icon-color": "#4A90E2",
      "bg-color": "#E3F2FD"
    }
  }
}

// ❌ Bad - changes structure
{
  "enhanced-prd-clarity": {
    "wireframe-section": {
      "heading": "Visual Mockups"
    }
  }
}
```

### 2. Test Visual Properties
When changing colors:
- Ensure sufficient contrast for accessibility
- Test both light and dark backgrounds
- Verify icon visibility against background colors

### 3. Image Assets
When using different images:
- Maintain the same aspect ratios
- Provide both standard and mobile variants where needed
- Use WebP format for performance
- Place images in `/public/marketing/homepage/`

### 4. Content Length
Keep text length similar to the original to maintain layout integrity:
- Titles: ~5-8 words
- Subtitles: ~15-20 words
- Descriptions: ~20-30 words

### 5. A/B Testing
For A/B testing with tools like Optimizely or VWO:
- Create variant JSON files with clear naming (e.g., `homepage-variant-a.json`, `homepage-variant-b.json`)
- Use dynamic imports based on user bucket
- Track variant performance with your analytics platform

## Dynamic Variant Loading (Advanced)

For runtime variant selection:

```typescript
// lib/content-variants.ts
export function getVariantContent(variantId: string) {
  switch (variantId) {
    case 'variant-a':
      return require('@/content/library/homepage-variant-a.json')
    case 'variant-b':
      return require('@/content/library/homepage-variant-b.json')
    default:
      return require('@/content/library/homepage.json')
  }
}

// In component
import { getVariantContent } from '@/lib/content-variants'

export default function HomepageComponent() {
  const variantId = getUserVariant() // Your bucketing logic
  const content = getVariantContent(variantId)
  // Use content instead of direct import
}
```

## Customizable Properties

### Text Properties
All text is customizable through the JSON:
- Titles and headings
- Descriptions and body text
- CTA button text
- Badge labels

### Visual Properties
All visual assets are customizable:
- `image`: Main image path
- `image-mobile`: Mobile-specific image path (optional)
- `icon-color`: Icon color (hex code)
- `bg-color`: Background color (hex code)

### Example Color Schemes

**Original (Professional Blue)**:
```json
{
  "icon-color": "#51A1E1",
  "bg-color": "#D1EDF3"
}
```

**Variant (Modern Purple)**:
```json
{
  "icon-color": "#9B59B6",
  "bg-color": "#F3E5F5"
}
```

**Variant (Energetic Green)**:
```json
{
  "icon-color": "#27AE60",
  "bg-color": "#E8F5E9"
}
```

## Troubleshooting

### Component not updating after JSON change
1. Restart the dev server: `pnpm dev`
2. Clear Next.js cache: `rm -rf .next`
3. Check for JSON syntax errors

### Colors not appearing correctly
1. Verify hex codes are valid
2. Check that `style` prop is applied correctly
3. Ensure Tailwind classes aren't overriding inline styles

### Images not loading
1. Verify image paths are correct and start with `/`
2. Check that images exist in `/public` directory
3. Verify image format is supported (WebP, PNG, JPG)

## Questions?

For questions about the variant system or implementation:
1. Review the base implementation in components files
2. Check the example variant JSON
3. Test changes locally before deploying
