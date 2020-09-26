// region // #region require

const mongoose = require('mongoose');

// endregion //#endregion

// region // #region Schema

const TaskListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
      type: String
    },
    content: {
      type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const TaskList = module.exports = mongoose.model('TaskList', TaskListSchema);

// endregion //#endregion

// region // #region Create

module.exports.addTaskList = function(tasklist, callback){
    tasklist.save(callback);
};

// endregion //#endregion

// region // #region READ

module.exports.getTaskList = function(id, callback){
    TaskList.findById(id, callback);
};

module.exports.getTaskLists = function(user, callback){
    const query = {user: user}
    TaskList.find(query, callback);
};

// endregion //#endregion

// region // #region UPDATE

module.exports.updateTaskList = function (tasklist, callback) {
    TaskList.findByIdAndUpdate(tasklist._id, tasklist, {upsert: true}, callback);
};

// endregion //#endregion

// region // #region DELETE

module.exports.deleteTaskList = function (id, callback) {
    TaskList.findOneAndDelete({_id: id}, callback)
};

// endregion //#endregion

