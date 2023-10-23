const request = require('supertest') // Importe a biblioteca supertest
const app = require('../app')

describe('User', () => {
  it('should create a user in the database', async () => {
    const user = {
      email: 'user@example.com',
      password: '123456',
    }
    const res = await request(app)
      .post('/api/users/created')
      .send(user)
      .set('Content-Type', 'application/json')

    expect(res.status).toEqual(201)
  })
  it('should show a error invalid email', async () => {
    const user = {
      email: 'user@example.com',
      password: '123456',
    }
    const res = await request(app)
      .post('/api/users/created')
      .send(user)
      .set('Content-Type', 'application/json')

    expect(res.status).toEqual(500)
  })
})
