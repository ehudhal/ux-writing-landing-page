export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
}

export function isProductionEnvironment() {
  return process.env.NODE_ENV === 'production'
}

export function isProductionBuild() {
  return process.env.NODE_ENV === 'production'
}
