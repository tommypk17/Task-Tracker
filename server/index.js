const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      passport = require('passport'),
      mongoose = require('mongoose');

module.exports = function() {
  let server = express(),
      create,
      start

  //create a new server instance
  create = function (config) {
    let routes = require('./routes');

    // Server settings
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);
    server.set('database', config.database);

    // Returns middleware that parses json
    server.use(bodyParser.json());

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    //returns passport authentication
    require('../configs/passport')(passport);
    server.use(passport.initialize());
    server.use(passport.session());

    server.use(cors());

    // Set up routes
    routes.init(server);
  }

  //start the server instance
  start = function () {
    let hostname = server.get('hostname'),
        port = server.get('port'),
        database = server.get('database');

    //start listening for requests
    server.listen(port, function () {
      console.log('Express server listening on - http://' + hostname + ':' + port);
    });

    //DB Connection
    mongoose.connect(database.uri,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

    mongoose.connection.on('connected', () =>{
      console.log('Connected to database: ' + database.uri);
    });

    mongoose.connection.on('error', (err) =>{
      console.log('DB Error: ' + err);
    });
  };

  //return functions for startup & creation
  return {
    create: create,
    start: start
  };
};



