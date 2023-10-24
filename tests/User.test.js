const request = require('supertest')
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
  it('should show a error invalid email when create a new user', async () => {
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
  it('should show an invalid user error when logging in', async () => {
    const user = {
      email: 'teste@example.com',
      password: '123456',
    }
    const res = await request(app)
      .post('/api/users/login')
      .send(user)
      .set('Content-Type', 'application/json')

    expect(res.status).toEqual(500)
    expect(res.body.message).toBe('Invalid user!')
  })
  it('should login in as user', async () => {
    const user = {
      email: 'user@example.com',
      password: '123456',
    }
    const res = await request(app)
      .post('/api/users/login')
      .send(user)
      .set('Content-Type', 'application/json')

    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user).toBeDefined()

  })
})
