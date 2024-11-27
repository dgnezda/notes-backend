import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const IV_LENGTH = 16

async function deriveKey(password: string, salt: string): Promise<Buffer> {
  return (await promisify(scrypt)(password, salt, 32)) as Buffer
}

export async function encrypt(text: string, userId: string): Promise<string> {
  const iv = randomBytes(IV_LENGTH)
  const key = await deriveKey(ENCRYPTION_KEY, userId) // userId as unique salt
  const cipher = createCipheriv('aes-256-cbc', key, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export async function decrypt(encryptedText: string, userId: string): Promise<string> {
  const [ivHex, encryptedHex] = encryptedText.split(':')
  if (!ivHex || !encryptedHex) {
    throw new Error('Invalid encrypted text format')
  }

  const iv = Buffer.from(ivHex, 'hex')
  const encrypted = Buffer.from(encryptedHex, 'hex')
  const key = await deriveKey(ENCRYPTION_KEY, userId) // same userId as salt to decrypt

  const decipher = createDecipheriv('aes-256-cbc', key, iv)
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return decrypted.toString()
}
