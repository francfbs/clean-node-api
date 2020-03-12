import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from '../add-account/db-add-account-interfaces'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hash = await this.encrypter.encrypt(account.password)
    const result = await this.addAccountRepository.add(Object.assign({}, account, { password: hash }))
    return result
  }
}
