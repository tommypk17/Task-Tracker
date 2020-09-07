const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const User = require('../server/models/user');
const config = require('../configs');


module.exports = function(passport){
   let opts = {};
   opts.jwtFromRequest = jwtExtract.fromAuthHeaderWithScheme('jwt');
   opts.secretOrKey = config.database.secret;
   passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
       User.getUserById(jwt_payload.data._id, (err, user) => {
           if(err){
               return done(err, false);
           }
           if(user){
               return done(null, user);
           }else{
               return done(null, false);
           }
       });
   }));
};