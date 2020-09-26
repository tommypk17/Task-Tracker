const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const requestValidation = require('../../middleware/requestValidation');
const config = require('../../../configs');

router.post('/register', requestValidation({content: 'json'}), (req, res, next) => {

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    date_registered: req.body.date_registered
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, message: 'Failed to register user'})
    }else{
      res.json({success: true, message: 'User registered'})
    }
  });
});

router.post('/auth', requestValidation({content: 'json'}), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, message: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch)=>{
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.database.secret, {
          expiresIn: 604800 //1 week
        });
        user.password = undefined;
        user.__v = undefined;
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: user
        })
      }else {
        return res.json({success: false, message: 'Incorrect username or password'});
      }
    });
  });
});

router.get('/profile', [requestValidation({content: 'json'}),passport.authenticate('jwt', {session:false})], (req, res, next) => {
  User.getUserById(req.user._id, (err, user) => {
    if (err) throw err;
    res.json({
      success: true,
      message: 'user found',
      data: user
    });
  });
});


module.exports = router;