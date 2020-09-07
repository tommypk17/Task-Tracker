const
    usersRoute = require('./users');

function init(server) {
  //log all route accesses
  server.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

  server.get('/', function (req, res) {
    res.redirect('/home');
  });

  //root routes
  server.use('/users', usersRoute);
}

module.exports = {
  init: init
};