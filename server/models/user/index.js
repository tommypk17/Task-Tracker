const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
      type: String
    },
    date_registered: {
        type: Date
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    settings: {
        type: Object
    }
});



const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
};

module.exports.addUser = function(user, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){throw err;}
            user.password = hash;
            user.save(callback);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err)throw err;
        callback(null, isMatch);
    });
};

module.exports.updateUser = function (user, callback) {
    User.findByIdAndUpdate(user._id, user, {upsert: true}, callback);
};

module.exports.deleteUser = function (id, callback) {
    User.findByIdAndDelete(id, callback);
};
