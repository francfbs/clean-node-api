import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from '../add-account/db-add-account-interfaces'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hash = await this.hasher.hash(account.password)
    const result = await this.addAccountRepository.add(Object.assign({}, account, { password: hash }))
    return result
  }
}
