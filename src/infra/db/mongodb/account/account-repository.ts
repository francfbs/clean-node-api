import { AddAccountRepository } from '../../../../data/interfaces/add-account-repository'
import { AccountModel, AddAccountModel } from '../../../../data/usecases/add-account/db-add-account-interfaces'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    return MongoHelper.map(result.ops[0])
  }
}
