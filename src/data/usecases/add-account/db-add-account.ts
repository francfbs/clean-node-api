import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from '../add-account/db-add-account-interfaces'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository
  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hash = await this.hasher.hash(account.password)
    const result = await this.addAccountRepository.add(Object.assign({}, account, { password: hash }))
    return result
  }
}
