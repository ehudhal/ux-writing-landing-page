import { marked } from 'marked'

const DATALAB_API_KEY = process.env.DATALAB_API_KEY
const DATALAB_API_URL = 'https://www.datalab.to/api/v1/marker'

if (!DATALAB_API_KEY) {
  throw new Error('pdf conversion service key is not available')
}
export const convertPdfToHtml = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('force_ocr', 'false')
    formData.append('paginate', 'false')
    formData.append('output_format', 'markdown')

    const response = await fetch(DATALAB_API_URL, {
      method: 'POST',
      headers: {
        'X-Api-Key': DATALAB_API_KEY
      },
      body: formData
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('PDF conversion failed:', error)
      throw new Error('PDF conversion failed')
    }

    const { request_check_url, error } = await response.json()

    if (error) {
      throw new Error(`API Error: ${error}`)
    }

    const result = await pollForResult(
      async () => {
        const checkResponse = await fetch(request_check_url, {
          headers: {
            'X-Api-Key': DATALAB_API_KEY
          }
        })

        if (!checkResponse.ok) {
          throw new Error('Failed to check processing status')
        }

        return checkResponse.json()
      },
      {
        shouldContinue: response => {
          return !(response.success && response.status === 'complete')
        }
      }
    )

    if (!result.markdown) {
      throw new Error('No markdown content in response')
    }

    // Convert markdown to HTML using marked
    const html = marked(result.markdown, {
      gfm: true, // GitHub Flavored Markdown
      breaks: true // Convert line breaks to <br>
    })

    return html
  } catch (error) {
    console.error('PDF conversion error:', error)
    throw new Error('Failed to convert PDF')
  }
}

interface CheckResponse {
  success: boolean
  status: string
  markdown?: string
  error?: string
}

const pollForResult = async (
  checkFn: () => Promise<CheckResponse>,
  options: {
    maxAttempts?: number
    delayMs?: number
    shouldContinue: (result: CheckResponse) => boolean
  }
): Promise<CheckResponse> => {
  const { maxAttempts = 30, delayMs = 2000, shouldContinue } = options
  let attempts = 0

  while (attempts < maxAttempts) {
    const result = await checkFn()

    if (!shouldContinue(result)) {
      return result
    }

    await new Promise(resolve => setTimeout(resolve, delayMs))
    attempts++
  }

  throw new Error('Operation timed out')
}
