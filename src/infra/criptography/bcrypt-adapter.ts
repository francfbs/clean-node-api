import bcrypt from 'bcrypt'
import { Hasher } from '../../data/interfaces/criptography/hasher'

export class BcryptAdapter implements Hasher {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    return bcrypt.hash(value, 12)
  }
}
