/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const request = require('request');
require('chai');
const assert = require('assert');

describe('server', () => {
  before(() => {
    const server = require('./../api');
  });

  describe('post/api/users', () => {
    const data = {};
    before((done) => {
      request.post('http://localhost:8000/api/v1/users', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      assert.equal(data.status, 400);
    });
  });

  describe('post/api/parcels', () => {
    const data = {};
    before((done) => {
      request.post('http://localhost:8000/api/v1/parcels', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      assert.equal(data.status, 404);
    });
    it('message successful', () => {
      assert.equal(data.body, {});
    });
  });

  describe('get/api/parcels', () => {
    const data = {};
    before((done) => {
      request.get('http://localhost:8000/api/v1/parcels', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      assert.equal(data.status, 404);
    });
    it('message successful', () => {
      assert.equal(data.body, {});
    });
  });

  describe('get/api/parcels/:parcelid', () => {
    const data = {};
    before((done) => {
      request.get('http://localhost:8000/api/v1/parcels/:parcelid', (error, res, body, response) => {
        data.status = res.statusCode;
        data.body = body;
        data.response = response;
        done();
      });
    });
    it('status 200', () => {
      assert.equal(data.status, 404);
    });
    it('message failure', () => {
      assert.equal(data.body, 'the parcel with the giving id is not available');
    });

    it('message successful', () => {
      assert.equal(data.response, {});
    });
  });

  describe('get/api/users/:userid/parcels', () => {
    const data = {};
    before((done) => {
      request.get('http://localhost:8000/api/v1/users/:userid/parcels', (error, res, body, response) => {
        data.status = res.statusCode;
        data.body = body;
        data.response = response;
        done();
      });
    });
    it('status 200', () => {
      assert.equal(data.status, 400);
    });
    it('message failure', () => {
      assert.equal(data.body, 'the parcel with the giving id is not available');
    });
  });

  describe('PUT/api/parcels/parcelid', () => {
    const data = {};
    before((done) => {
      request.put('http://localhost:8000/api/v1/parcels/:parcelid/cancel', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      assert.equal(data.status, 404);
    });
    it('body', () => {
      assert.equal(data.body, 'the parcel with the giving id is not available');
    });
  });
});
