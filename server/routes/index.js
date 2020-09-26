const
    usersRoute = require('./users'),
    tasksRoute = require('./tasks');
    tasklistsRoute = require('./tasklists');

function init(server) {
  //log all route accesses
  server.get('*', function (req, res, next) {
    return next();
  });

  server.get('/', function (req, res) {
    res.redirect('/home');
  });

  //root routes
  server.use('/users', usersRoute);
  server.use('/tasks', tasksRoute);
  server.use('/tasklists', tasklistsRoute);
}

module.exports = {
  init: init
};