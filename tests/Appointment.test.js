const request = require('supertest')
const app = require('../app')

/*
* For create appointment is necessary an id
* Insert the parameter "id" in objetc and use a user object in your database
* the database application should be make in mongodb
*  */

describe('Appointment', () => {
  it('should create a new appointment', async () => {
    const appointment = {
      'date': '2023-10-25T15:30:00',
      'service': 'Service test',
    }
    const res = await request(app)
      .post('/api/appointments/created')
      .send(appointment)
      .set('Content-Type', 'application/json')

    expect(res.status).toEqual(201)
    expect(res.body.message).toEqual('Appointment created successifily')
  })
  it('should check whether the request date is less than todays date', async () => {
    const appointment = {
      'date': new Date(Date.now() - 24 * 60 * 60 * 1000),
      'service': 'Service test',
    }
    const res = await request(app)
      .post('/api/appointments/created')
      .send(appointment)
      .set('Content-Type', 'application/json')

    expect(res.status).toEqual(500)
    expect(res.body.message).toEqual('Date invalid!')
  })
  it('should delete an appointment', async () => {
    const appointment = {
      'appointmentId': '6537f0cb304c9751c15c82bf',
    }
    const res = await request(app)
      .delete('/api/appointments/delete')
      .send(appointment)
      .set('Content-Type', 'application/json')

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Appointment deleted!')
  })
  it('should check whether an appointmentId is valid when it is delete', async () => {
    const appointment = {
      'appointmentId': '1231231231',
    }
    const res = await request(app)
      .delete('/api/appointments/delete')
      .send(appointment)
      .set('Content-Type', 'application/json')

    expect(res.status).toBe(500)
    expect(res.body.message).toBe('Error... appointment not found!')

  })
})
