export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null
  return function() {
    // @ts-ignore
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      func.apply(context, args)
    }
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
