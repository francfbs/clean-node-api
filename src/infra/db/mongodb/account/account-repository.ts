import { AddAccountRepository } from '../../../../data/interfaces/db/account/add-account-repository'
import { AccountModel, AddAccountModel } from '../../../../data/usecases/add-account/db-add-account-interfaces'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadAccountByEmailRepository } from '../../../../data/interfaces/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/interfaces/db/account/update-access-token-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: id }, {
      $set: { accessToken: token }
    })
  }
}
