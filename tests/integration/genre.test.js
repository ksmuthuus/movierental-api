const request = require("supertest");
const app = require("../../src/startup");
const {
  Genre
} = require('../../src/models/genre')
const {
  User
} = require('../../src/models/user')



describe('/api/genre', () => {

  afterEach(async () => {
    await Genre.remove({})
  })

  describe('GET /', () => {
    test("Should return 200 with all Genres", async () => {

      await Genre.insertMany([{
        name: 'genre1'
      }, {
        name: 'genre2'
      }, {
        name: 'genre3'
      }])

      const response = await request(app)
        .get("/api/genres")
        .expect(200);

      expect(response.body.length).toBe(3)

      expect(response.body.some(g => g.name === 'genre1')).toBeTruthy()
    });
  })

  describe('GET /:id', () => {
    test("Should return 200 for a valid genre id", async () => {
      const genre = new Genre({
        name: 'genre1'
      })
      await genre.save()

      const response = await request(app).get('/api/genres/' + genre._id)
      expect(response).not.toBeNull()
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('name', genre.name)

    })

    test("Should return 404 for invalid genre id", async () => {
      const response = await request(app).get('/api/genres/1')
      //expect(response).toBeNull()
      expect(response.status).toBe(404)

    })
  })

  describe('POST /', () => {

    let token;
    let name;

    beforeEach(async () => {
      token = new User().generateAuthToken()
      name = 'genre1'
    })

    const exec = async () => {
      return await request(app).post('/api/genres')
        .set('x-auth-token', token)
        .send({
          name
        })
    }

    test('Should return 201 for valid genre', async () => {
      const response = await exec()
      expect(response.status).toBe(201)

      const genre = await Genre.findById(response.body._id)
      expect(genre).not.toBeNull()

      expect(genre).toHaveProperty('name', response.body.name)
    })

    test('Should return 400 for invalid input(min < 3)', async () => {

      name = 'ge'
      const response = await exec()

      expect(response.status).toBe(400)
    })

    test('Should return 400 for invalid input(max > 15)', async () => {
      name = new Array(17).join('a')
      const response = await exec()

      expect(response.status).toBe(400)
    })

    test('Should return 401 for unauthorized access', async () => {
      name = 'genre1'
      token = ''

      const response = await exec()

      expect(response.status).toBe(401)
    })
  })

})