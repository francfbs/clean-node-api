import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-repository'
import { Collection } from 'mongodb'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

let collection: Collection

const makeFakeAddAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('accounts')
    await collection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return a account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAddAccount())
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return a account on loadByEmail success', async () => {
    const sut = makeSut()
    await collection.insertOne(makeFakeAddAccount())
    const account = await sut.loadByEmail('any_email@email.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail cannot find register', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@email.com')
    expect(account).toBeNull()
  })

  test('Should update access token successfully', async () => {
    const sut = makeSut()
    const res = await collection.insertOne(makeFakeAddAccount())
    expect(res.ops[0].token).toBeFalsy()
    await sut.updateToken(res.ops[0]._id, 'any_token_updated')
    const account = await collection.findOne({ _id: res.ops[0]._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token_updated')
  })
})
