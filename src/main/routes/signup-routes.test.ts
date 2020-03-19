import app from '../config/app'
import supertest from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})

beforeEach(async () => {
  const collection = MongoHelper.getCollection('accounts')
  await collection.deleteMany({})
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

describe('SignUp Routes', () => {
  test('Should return an accaount on success', async () => {
    await supertest(app)
      .post('/api/signup')
      .send({
        name: 'Francisco',
        email: 'francfbs@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
