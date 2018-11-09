/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const request = require('request');

describe('server', () => {
  beforeAll(() => {
    const server = require('./../api_endpoints/api.js');
  });

  describe('post/api/users', () => {
    const data = {};
    beforeAll((done) => {
      request.post('http://localhost:8000/api/users', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
  });
});
