export class LocalStorage {
  static get(key: string): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  }

  static getItem(key: string): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  }

  static set(key: string, value: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  }

  static setItem(key: string, value: any, _context?: any): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }
}
