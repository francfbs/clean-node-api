import app from '../config/app'
import supertest from 'supertest'

describe('Cors Middleware', () => {
  test('Should enable cors ', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await supertest(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
