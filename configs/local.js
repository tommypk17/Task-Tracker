let localConfig = {
    hostname: 'localhost',
    port: 3000,
    database: {
        uri: 'mongodb://localhost:27017/Task-Tracker',
        secret: 'secret'
    }
};

module.exports = localConfig;