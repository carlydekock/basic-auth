'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

//lifecycle 
usersSchema.pre('save', async function (next) {
  console.log('this is THIS', this);
  let user = this;
  bcrypt.hash(user.password, 5, (error, hash) => {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      console.log('this is hash', hash);
      next();
    }
  });
});

usersSchema.statics.user = async function (username, password, next, req) {
  console.log('this is THIS', this);
  const user = await this.findOne({ username: username });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    req.user = user;
    next();
    // res.status(200).json(user);
  }
  else {
    throw new Error('Invalid User');
  }
  // try {
  //   req.body.password = await bcrypt.hash(req.body.password, 10);
  //   console.log(req.body.password);
  //   const user = new Users(req.body);
  //   console.log('this is user', user);
  //   const record = await user.save(req.body);
  //   res.status(200).json(record);
  // } catch (e) { res.status(403).send('Error Creating User'); }

};

const Users = mongoose.model('users', usersSchema);

module.exports = Users;