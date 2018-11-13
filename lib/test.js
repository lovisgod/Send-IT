/* eslint-env mocha */

/* eslint-disable no-unused-vars */

import { post, get, put } from 'request';
import 'chai';
import { equal } from 'assert';
import './api';

describe('server', () => {
  before(() => {
    // const server = require('./../lib/api').default.default;
  });

  describe('post/api/users', () => {
    const data = {};
    before((done) => {
      post('http://localhost:8000/api/v1/users', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      equal(data.status, 200);
    });
  });

  describe('post/api/parcels', () => {
    const data = {};
    before((done) => {
      post('http://localhost:8000/api/v1/parcels', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      equal(data.status, 200);
    });
  });

  describe('get/api/parcels', () => {
    const data = {};
    before((done) => {
      get('http://localhost:8000/api/v1/parcels', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      equal(data.status, 200);
    });
  });

  describe('get/api/parcels/:parcelid', () => {
    const data = {};
    before((done) => {
      get('http://localhost:8000/api/v1/parcels/:parcelid', (error, res, body, response) => {
        data.status = res.statusCode;
        data.body = body;
        data.response = response;
        done();
      });
    });
    it('status 200', () => {
      equal(data.status, 400);
    });
  });

  describe('get/api/users/:userid/parcels', () => {
    const data = {};
    before((done) => {
      get('http://localhost:8000/api/v1/users/:userid/parcels', (error, res, body, response) => {
        data.status = res.statusCode;
        data.body = body;
        data.response = response;
        done();
      });
    });
    it('status 200', () => {
      equal(data.status, 404);
    });
  });

  describe('PUT/api/parcels/parcelid', () => {
    const data = {};
    before((done) => {
      put('http://localhost:8000/api/v1/parcels/:parcelid/cancel', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      equal(data.status, 400);
    });
  });
});
