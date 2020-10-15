const
    _ = require('lodash'),
    env = process.env.NODE_ENV || 'local',
    envConfig = require(('./' + env).trim());

let defaultConfig = {
    env: env
};
module.exports = _.merge(defaultConfig, envConfig);