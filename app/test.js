/* eslint-env mocha */

import { post, get, put } from 'request';
import { assert, expect } from 'chai';
import './api';
import { pool, query } from './database/database';

describe('server', () => {
  before((done) => {
    query.forEach(qued => pool.query(qued, error => console.log(error)));
    pool.query(
      'INSERT INTO "Parcels"("Name", "Pickup", "Destination", "Reciever", "userid", "RecieverMail", "Weight", "status", "location" ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      ['tomilola tosin', 'ikotun lagos nigeria', 'ikeja lagos', 'bamidele joihnson', id,
        'olif@gmail.com', 20, 'Transit', 'Send-IT Warehouse']
    );
  });
});
describe('post/api/auth/signup', () => {
  const data = {};
  before((done) => {
    query.forEach(qued => pool.query(qued, error => console.log(error)));
    post('http://localhost:8000/api/v1/auth/signup', (error, res) => {
      data.status = res.statusCode;
      data.body = res.body;
      done();
    });
  });
  it('status 400', () => {
    assert.equal(data.status, 400);
  });
  it('the success message should be', () => {
    expect(data.body).to.equal('"FirstName" is required');
  });
});

describe('post/api/auth/login', () => {
  const data = {};
  before((done) => {
    post('http://localhost:8000/api/v1/auth/login', (error, res) => {
      data.status = res.statusCode;
      data.body = res.body;
      done();
    });
  });
  it('status 400', () => {
    assert.equal(data.status, 400);
  });
  it('when no user is logged in', () => {
    expect(data.body).to.equal('"userid" is required');
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
  it('wrong status', () => {
    assert.equal(data.status, 400);
  });
  it('no input filled in ', () => {
    expect(data.body).to.equal('"Name" is required');
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
  it('when server wrong response', () => {
    assert.equal(data.status, 500);
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
  it(' wrong status', () => {
    assert.equal(data.status, 500);
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
  it('wrong status', () => {
    assert.equal(data.status, 500);
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
  it('bad status', () => {
    assert.equal(data.status, 500);
  });
});
