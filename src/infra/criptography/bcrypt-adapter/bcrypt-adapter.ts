import bcrypt from 'bcrypt'
import { Hasher } from '../../../data/interfaces/criptography/hasher'
import { HashComparer } from '../../../data/interfaces/criptography/hash-comparer'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    return bcrypt.hash(value, 12)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
