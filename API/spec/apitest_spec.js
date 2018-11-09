/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const request = require('request');

describe('server', () => {
  beforeAll(() => {
    const server = require('./../../api');
  });

  describe('post/api/users', () => {
    const data = {};
    beforeAll((done) => {
      request.post('http://localhost:8000/api/v1/users', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
  });

  describe('post/api/parcels', () => {
    const data = {};
    beforeAll((done) => {
      request.post('http://localhost:8000/api/v1/parcels', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('message successful', () => {
      expect(data.body).toEqual({});
    });
  });

  describe('get/api/parcels', () => {
    const data = {};
    beforeAll((done) => {
      request.get('http://localhost:8000/api/v1/parcels', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('message successful', () => {
      expect(data.body).toEqual({});
    });
  });

  describe('get/api/parcels/:parcelid', () => {
    const data = {};
    beforeAll((done) => {
      request.get('http://localhost:8000/api/v1/parcels/:parcelid', (error, res, body, response) => {
        data.status = res.statusCode;
        data.body = body;
        data.response = response;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(400);
    });
    it('message failure', () => {
      expect(data.body).toEqual('the parcel with the giving id is not available');
    });

    it('message successful', () => {
      expect(data.response).toEqual({});
    });
  });

  describe('get/api/users/:userid/parcels', () => {
    const data = {};
    beforeAll((done) => {
      request.get('http://localhost:8000/api/v1/users/:userid/parcels', (error, res, body, response) => {
        data.status = res.statusCode;
        data.body = body;
        data.response = response;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(400);
    });
    it('message failure', () => {
      expect(data.body).toEqual('the parcel with the giving id is not available');
    });
  });

  describe('PUT/api/parcels/parcelid', () => {
    const data = {};
    beforeAll((done) => {
      request.put('http://localhost:8000/api/v1/parcels/:parcelid/cancel', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('body', () => {
      expect(data.body).toBe('the parcel with the giving id is not available');
    });
  });
});
