import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from '../add-account/db-add-account-interfaces'
import { LoadAccountByEmailRepository } from '../authentication/db-authentication-interfaces'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const anAccount = await this.loadAccountByEmailRepository.loadByEmail(account.email)
    if (anAccount) {
      return null
    }
    const hash = await this.hasher.hash(account.password)
    const result = await this.addAccountRepository.add(Object.assign({}, account, { password: hash }))
    return result
  }
}
