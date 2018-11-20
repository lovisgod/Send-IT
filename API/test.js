/* eslint-disable linebreak-style */
/* eslint-env mocha */

import { post, get, put } from 'request';
import { assert, expect } from 'chai';
import './api';

describe('server', () => {
  describe('post/api/users', () => {
    const data = {};
    before((done) => {
      post('http://localhost:8000/api/v1/users', (error, res) => {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status 200', () => {
      assert.equal(data.status, 200);
    });
    it('added user it should return type of object', () => {
      expect(JSON.parse(data.body)).to.be.an('object');
    });
  });

  describe('post/api/parcels', () => {
    const data = {};
    before((done) => {
      post('http://localhost:8000/api/v1/parcels', (error, res) => {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status 200', () => {
      assert.equal(data.status, 200);
    });
    it('status 200', () => {
      expect(JSON.parse(data.body)).to.be.an('object');
    });
  });

  describe('get/api/parcels', () => {
    const data = {};
    before((done) => {
      get('http://localhost:8000/api/v1/parcels', (error, res) => {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status 200', () => {
      assert.equal(data.status, 200);
    });
    it('parcel gotten', () => {
      expect(JSON.parse(data.body)).to.be.an('array');
    });
  });

  describe('get/api/parcels/:parcelid', () => {
    const data = {};
    before((done) => {
      get('http://localhost:8000/api/v1/parcels/:parcelid', (error, res) => {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status', () => {
      assert.equal(data.status, 200);
    });
    it('user parcel gotten', () => {
      expect(JSON.parse(data.body)).to.be.an('Array');
    });
  });

  describe('get/api/users/:userid/parcels', () => {
    const data = {};
    before((done) => {
      get('http://localhost:8000/api/v1/users/:userid/parcels', (error, res) => {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status', () => {
      assert.equal(data.status, 200);
    });
    it('user parcels gotten', () => {
      if (data.status === 404) {
        assert.equal(data.body, 'the user with that id is not available');
      } else {
        expect(JSON.parse(data.body)).to.be.an('object');
      }
    });
  });

  describe('PUT/api/parcels/parcelid', () => {
    const data = {};
    before((done) => {
      put('http://localhost:8000/api/v1/parcels/:parcelid/cancel', (error, res) => {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status', () => {
      assert.equal(data.status, 400);
    });
    it('specific parcel cancelled', () => {
      if (data.status === 400) {
        assert.equal(data.body, 'Nothing to cancel');
      } else {
        assert.equal(data.body, 'you have successfully cancelled the delivery order');
      }
    });
  });
});
