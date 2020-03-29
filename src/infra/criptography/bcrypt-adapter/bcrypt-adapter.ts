import bcrypt from 'bcrypt'
import { Hasher } from '../../../data/interfaces/criptography/hasher'
import { HashComparer } from '../../../data/interfaces/criptography/hash-comparer'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    return bcrypt.hash(value, 12)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
