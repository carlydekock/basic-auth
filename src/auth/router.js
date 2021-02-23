'use strict';

const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
const userModel = require('../auth/models/users-model.js');
// const Users = new userModel(userModel.Users);
const basicAuth = require('../auth/middleware/basic.js');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', createSignup);

async function createSignup(req, res, next) {
  try {
    const user = new userModel(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  }
  catch (e) { res.status(403).send('Error creating user'); }
}

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, createSignin);

async function createSignin(req, res, next) {

  console.log(req.user);
  res.send('here is response');
  // /*
  //   req.headers.authorization is : "Basic sdkjdsljd="
  //   To get username and password from this, take the following steps:
  //     - Turn that string into an array by splitting on ' '
  //     - Pop off the last value
  //     - Decode that encoded string so it returns to user:pass
  //     - Split on ':' to turn it into an array
  //     - Pull username and password from that array

  //   Now that we finally have username and password, let's see if it's valid
  //   1. Find the user in the database by username
  //   2. Compare the plaintext password we now have against the encrypted password in the db
  //      - bcrypt does this by re-encrypting the plaintext password and comparing THAT
  //   3. Either we're valid or we throw an error
  // */
 
}


module.exports = router;