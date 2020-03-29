import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { LogMongoRepository } from './log-repository'
import { LogErrorRepository } from '../../../../data/interfaces/db/log/log-error-repository'

const makeSut = (): LogErrorRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repository', () => {
  let collection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('errors')
    await collection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await collection.countDocuments()
    expect(count).toEqual(1)
  })
})
