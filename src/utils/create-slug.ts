export function createSlug(email: string, date = new Date()) {
  const normalizedEmail = email.trim().toLowerCase()

  const username = normalizedEmail.split("@")[0]

  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear()).slice(-2)

  return `${username}-${month}${year}`
}

export function createAnoSlug(ano: string) {
  const normalizedAno = ano.split(".")

  return `prova-${normalizedAno[0]}-${normalizedAno[1]}`
}
