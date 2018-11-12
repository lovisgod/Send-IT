'use strict';

var _request = require('request');

require('chai');

var _assert = require('assert');

require('./api');

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
  });

  describe('post/api/parcels', function () {
    var data = {};
    before(function (done) {
      (0, _request.post)('http://localhost:8000/api/v1/parcels', function (error, res, body) {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', function () {
      (0, _assert.equal)(data.status, 200);
    });
  });

  describe('get/api/parcels', function () {
    var data = {};
    before(function (done) {
      (0, _request.get)('http://localhost:8000/api/v1/parcels', function (error, res, body) {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', function () {
      (0, _assert.equal)(data.status, 200);
    });
  });

  describe('get/api/parcels/:parcelid', function () {
    var data = {};
    before(function (done) {
      (0, _request.get)('http://localhost:8000/api/v1/parcels/:parcelid', function (error, res, body, response) {
        data.status = res.statusCode;
        data.body = body;
        data.response = response;
        done();
      });
    });
    it('status 200', function () {
      (0, _assert.equal)(data.status, 400);
    });
  });

  describe('get/api/users/:userid/parcels', function () {
    var data = {};
    before(function (done) {
      (0, _request.get)('http://localhost:8000/api/v1/users/:userid/parcels', function (error, res, body, response) {
        data.status = res.statusCode;
        data.body = body;
        data.response = response;
        done();
      });
    });
    it('status 200', function () {
      (0, _assert.equal)(data.status, 404);
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
    it('status 200', function () {
      (0, _assert.equal)(data.status, 400);
    });
  });
});