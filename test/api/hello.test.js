const { describe, it } = require('mocha');
const supertest = require('supertest');
const createApi = require('../../lib/api');

describe('/hello', () => {
  it('GET should return 200 with \'hello\'', () => {
    const app = createApi();

    return supertest(app)
      .get('/hello')
      .expect(200)
      .expect('hello');
  });
});
