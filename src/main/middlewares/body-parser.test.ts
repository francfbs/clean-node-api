import app from '../config/app'
import supertest from 'supertest'

describe('Body Parser Middleware', () => {
  test('Should parse body as json ', async () => {
    app.post('/test_body_parse', (req, res) => {
      res.send(req.body)
    })
    await supertest(app)
      .post('/test_body_parse')
      .send({ name: 'Francisco' })
      .expect({ name: 'Francisco' })
  })
})
