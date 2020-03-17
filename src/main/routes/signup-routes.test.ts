import app from '../config/app'
import supertest from 'supertest'

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
