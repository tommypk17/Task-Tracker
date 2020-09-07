const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const requestValidation = require('../../middleware/requestValidation');
const config = require('../../../configs');

router.post('/register', requestValidation({content: 'www-encoded'}), (req, res, next) => {

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, message: 'Failed to register user'})
    }else{
      res.json({success: true, message: 'User registered'})
    }
  });
});

router.post('/auth', requestValidation({content: 'www-encoded'}), (req, res, next) => {
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
        res.json({
          success: true,
          token: 'JWT ' + token,
          user:{
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      }else {
        return res.json({success: false, message: 'Incorrect username or password'});
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({
    success: true,
    message: 'user found',
    data: req.user
  });
});


module.exports = router;