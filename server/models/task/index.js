// region // #region require

const TaskList = require('../tasklist');
const mongoose = require('mongoose');

// endregion //#endregion

// region // #region Schema

const TaskSchema = mongoose.Schema({
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
    lastUpdate: {
      type: Date,
      required: true
    },
    date: {
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

module.exports.getTasksAll = function(user, callback){
    TaskList.getTaskLists(user, (res, next, err) => {
        let ids = [];
        const tasklists = next;
        for (let tasklist of tasklists){
            ids.push(mongoose.Types.ObjectId(tasklist._id));
        }
        const query = {tasklist: { $in : ids}};
        Task.find(query, callback).sort({date: 'asc'});
    });
};

module.exports.getTasksByTaskListId = function(user, taskListId, callback){
    const query = {tasklist: mongoose.Types.ObjectId(taskListId)}
    Task.find(query, callback).sort({date: 'asc'});
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

