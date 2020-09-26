const express = require('express');
const router = express.Router();
const passport = require('passport');
const Task = require('../../models/task');
const requestValidation = require('../../middleware/requestValidation');


router.get('/:taskListId', passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let user = req.user;
    let taskListId = req.params.taskListId;

    Task.getTasks(user, taskListId, (err, tasks) => {
        if (err) throw err;
        if (!tasks || tasks.length < 1) return res.json({success: false, message: 'no tasks available'});
        return res.json({
            success: true,
            message: 'tasks found',
            data: tasks
        })
    });

});

router.get('/:taskListId/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let id = req.params.id;
    let taskListId = req.params.taskListId;

    Task.getTask(id, (err, task) => {
        if (err) throw err;
        if (!task) return res.json({success: false, message: 'no tasks available'});
        return res.json({
            success: true,
            message: 'task found',
            data: task
        })
    });

});

router.post('/create', requestValidation({content: 'json'}), passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let newTask = new Task({
        title: req.body.title,
        subtitile: req.body.subtitle,
        content: req.body.content,
        lastUpdate: Date.now(),
        complete: false,
        tasklist: req.body.tasklist
    });
    Task.addTask(newTask, (err, task) => {
        if(err){
            res.json({success: false, message: 'failed to add task', data:task})
        }else{
            res.json({success: true, message: 'task added', data: task})
        }
    });

});

router.post('/update', requestValidation({content: 'json'}), passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let updatedTask = new Task({
        _id: req.body.id,
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        lastUpdate: Date.now(),
        complete: req.body.done,
        tasklist: req.body.tasklist
    });

    Task.updateTask(updatedTask, (err, task) => {
        if(err){
            res.json({success: false, message: 'failed to update task', data: task})
        }else{
            res.json({success: true, message: 'task updated', data: task})
        }
    });

});

router.post('/delete', requestValidation({content: 'json'}), passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let id = req.body.id;

    Task.deleteTask(id, (err, task) => {
        if(err){
            res.json({success: false, message: 'failed to delete task', data: task})
        }else{
            res.json({success: true, message: 'task deleted', data: task})
        }
    });

});


module.exports = router;