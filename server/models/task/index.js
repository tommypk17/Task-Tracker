// region // #region require

const mongoose = require('mongoose');

// endregion //#endregion

// region // #region Schema

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
      type: String
    },
    lastUpdate: {
      type: Date,
      required: true
    },
    complete: {
      type: Boolean,
      required: true
    },
    tasklist: {
        type: mongoose.Types.ObjectId,
        ref: 'TaskList',
        required: true
    }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);

// endregion //#endregion

// region // #region Create

module.exports.addTask = function(task, callback){
    task.save(callback);
};

// endregion //#endregion

// region // #region READ

module.exports.getTask = function(id, callback){
    Task.findById(id, callback);
};

module.exports.getTasks = function(user, callback){
    const query = {user: user}
    Task.find(query, callback);
};

// endregion //#endregion

// region // #region UPDATE

module.exports.updateTask = function (task, callback) {
    Task.findByIdAndUpdate(task._id, task, {upsert: true}, callback);
};

// endregion //#endregion

// region // #region DELETE

module.exports.deleteTask = function (id, callback) {
    Task.findOneAndDelete({_id: id}, callback)
};

// endregion //#endregion

