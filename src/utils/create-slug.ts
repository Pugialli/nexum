export function createSlug(email: string, date = new Date()) {
  const normalizedEmail = email.trim().toLowerCase()

  const username = normalizedEmail.split("@")[0]

  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear()).slice(-2)

  return `${username}-${month}${year}`
}
