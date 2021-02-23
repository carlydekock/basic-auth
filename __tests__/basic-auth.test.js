'use strict';

require('@code-fellows/supergoose');
const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);

describe('server tests', () => {
  
});
