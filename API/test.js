/* eslint-env mocha */

/* eslint-disable no-unused-vars */

import { post, get, put } from 'request';
import 'chai';
import { equal, deepEqual } from 'assert';
import './api';
import { isArray } from 'util';
import { type } from 'os';


/* const newLocal = require('chai').expect;

const expect = newLocal;
const should = require('chai').should(); */

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
    it('added user', () => {
      isArray(data.body, {});
    });
  });

  describe('post/api/parcels', () => {
    const data = {};
    before((done) => {
      post('http://localhost:8000/api/v1/parcels', (error, res, body) => {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status 200', () => {
      equal(data.status, 200);
    });
    it('status 200', () => {
      isArray(data.body, {});
    });
  });

  describe('get/api/parcels', () => {
    const data = {};
    before((done) => {
      get('http://localhost:8000/api/v1/parcels', (error, res, body) => {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status 200', () => {
      equal(data.status, 200);
    });
    it('parcel gotten', () => {
      isArray(data.body, []);
    });
  });

  describe('get/api/parcels/:parcelid', () => {
    const data = {};
    before((done) => {
      get('http://localhost:8000/api/v1/parcels/:parcelid', (error, res, body) => {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status', () => {
      equal(data.status, 400);
    });
    it('user parcel gotten', () => {
      equal(data.body, 'the parcel with the giving id is not available');
    });
  });

  describe('get/api/users/:userid/parcels', () => {
    const data = {};
    before((done) => {
      get('http://localhost:8000/api/v1/users/:userid/parcels', (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status', () => {
      equal(data.status, 404);
    });
    it('user parcels gotten', () => {
      if (data.status === 404) {
        equal(data.body, 'the user with that id is not available');
      } else {
        isArray(data.body, {});
      }
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
    it('status', () => {
      equal(data.status, 400);
    });
    it('specific parcel gotten', () => {
      if (data.status === 400) {
        equal(data.body, 'Nothing to cancel');
      } else {
        isArray(data.body, {});
      }
    });
  });
});
