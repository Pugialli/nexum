import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const ENCRYPTION_KEY = crypto
  .createHash('sha256')
  .update('nexum-token')
  .digest('base64')
  .substr(0, 32) // chave de 32 bytes
const IV_LENGTH = 16 // IV precisa ter 16 bytes

// Função para encriptar
export function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH) // IV aleatório de 16 bytes
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
  let encrypted = cipher.update(text, 'utf8', 'base64')
  encrypted += cipher.final('base64')
  return iv.toString('hex') + ':' + encrypted // IV em hexadecimal para evitar problemas de tamanho
}

// Função para decriptar
export function decrypt(text: string) {
  const [ivHex, encryptedText] = text.split(':')
  const iv = Buffer.from(ivHex, 'hex') // Converter IV de volta para buffer
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
