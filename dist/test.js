'use strict';

var _request = require('request');

require('chai');

var _assert = require('assert');

require('./api');

var _util = require('util');

var _os = require('os');

/* const newLocal = require('chai').expect;

const expect = newLocal;
const should = require('chai').should(); */

/* eslint-env mocha */

/* eslint-disable no-unused-vars */

describe('server', function () {
  before(function () {
    // const server = require('./../lib/api').default.default;
  });

  describe('post/api/users', function () {
    var data = {};
    before(function (done) {
      (0, _request.post)('http://localhost:8000/api/v1/users', function (error, res, body) {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', function () {
      (0, _assert.equal)(data.status, 200);
    });
    it('added user', function () {
      (0, _util.isArray)(data.body, {});
    });
  });

  describe('post/api/parcels', function () {
    var data = {};
    before(function (done) {
      (0, _request.post)('http://localhost:8000/api/v1/parcels', function (error, res, body) {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status 200', function () {
      (0, _assert.equal)(data.status, 200);
    });
    it('status 200', function () {
      (0, _util.isArray)(data.body, {});
    });
  });

  describe('get/api/parcels', function () {
    var data = {};
    before(function (done) {
      (0, _request.get)('http://localhost:8000/api/v1/parcels', function (error, res, body) {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status 200', function () {
      (0, _assert.equal)(data.status, 200);
    });
    it('parcel gotten', function () {
      (0, _util.isArray)(data.body, []);
    });
  });

  describe('get/api/parcels/:parcelid', function () {
    var data = {};
    before(function (done) {
      (0, _request.get)('http://localhost:8000/api/v1/parcels/:parcelid', function (error, res, body) {
        data.status = res.statusCode;
        data.body = res.body;
        done();
      });
    });
    it('status', function () {
      (0, _assert.equal)(data.status, 400);
    });
    it('user parcel gotten', function () {
      (0, _assert.equal)(data.body, 'the parcel with the giving id is not available');
    });
  });

  describe('get/api/users/:userid/parcels', function () {
    var data = {};
    before(function (done) {
      (0, _request.get)('http://localhost:8000/api/v1/users/:userid/parcels', function (error, res, body) {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status', function () {
      (0, _assert.equal)(data.status, 404);
    });
    it('user parcels gotten', function () {
      if (data.status === 404) {
        (0, _assert.equal)(data.body, 'the user with that id is not available');
      } else {
        (0, _util.isArray)(data.body, {});
      }
    });
  });

  describe('PUT/api/parcels/parcelid', function () {
    var data = {};
    before(function (done) {
      (0, _request.put)('http://localhost:8000/api/v1/parcels/:parcelid/cancel', function (error, res, body) {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status', function () {
      (0, _assert.equal)(data.status, 400);
    });
    it('specific parcel gotten', function () {
      if (data.status === 400) {
        (0, _assert.equal)(data.body, 'Nothing to cancel');
      } else {
        (0, _util.isArray)(data.body, {});
      }
    });
  });
});