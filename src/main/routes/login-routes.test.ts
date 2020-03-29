import app from '../config/app'
import supertest from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let collection: Collection

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123456', 12)
      await collection.insertOne({
        name: 'Francisco',
        email: 'francfbs@gmail.com',
        password
      })

      await supertest(app)
        .post('/api/login')
        .send({
          email: 'francfbs@gmail.com',
          password: '123456'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await supertest(app)
        .post('/api/login')
        .send({
          email: 'francfbs@gmail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
