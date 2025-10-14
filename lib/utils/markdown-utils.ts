export function stripMarkdownFromString(content: string) {
  // Remove markdown characters (*, _, #, `, etc.)
  return content.replace(/[*_#`>~\[\]()]/g, '')
}
