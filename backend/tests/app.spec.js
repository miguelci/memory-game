const request = require('supertest')
const app = require('../app')

describe('Get Endpoints', () => {
  it('should return a 404', async () => {
    const res = await request(app)
      .get('/')
    expect(res.statusCode).toEqual(404)
  })

  it('should return an error message when cards endpoint is hit', async () => {
    const res = await request(app)
      .get('/cards')
    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({
      success: false,
      message: 'A number (4, 8 or 12) has to be sent as query parameter'
    })
  })

  it('should return an error message when string parameter is sent', async () => {
    const res = await request(app)
      .get('/cards?number=a')
    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({
      success: false,
      message: 'A number (4, 8 or 12) has to be sent as query parameter'
    })
  })

  it('should return an error message when incorrect number is sent', async () => {
    const res = await request(app)
      .get('/cards?number=1')
    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({
      success: false,
      message: 'A number (4, 8 or 12) has to be sent as query parameter'
    })
  })

  it('should return different numbers on a correct response', async () => {
    const requestedNumbers = 12
    const res = await request(app)
      .get(`/cards?number=${requestedNumbers}`)
    expect(res.statusCode).toEqual(200)
    const body = res.body

    expect(body.success).toBe(true)
    expect(body).toHaveProperty('list')
    expect(body.list.length).toBe(requestedNumbers)
    const unique = new Set(body.list)
    expect(unique.size).toBe(requestedNumbers)
  })
})