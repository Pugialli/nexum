interface TimeFormat {
  min: number | null
  sec: number | null
}

export function timeToString({ min, sec }: TimeFormat) {
  let result = ''

  if (min) {
    result += `${min}m`
  }

  if (sec) {
    result += `${sec}s`
  }

  return result || '0s' // Retorna '0s' caso ambos sejam 0
}
