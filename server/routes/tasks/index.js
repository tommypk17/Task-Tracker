const express = require('express');
const router = express.Router();
const passport = require('passport');
const Task = require('../../models/task');
const requestValidation = require('../../middleware/requestValidation');


router.get('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let user = req.user;

    Task.getTasks(user, (err, tasks) => {
        if (err) throw err;
        if (!tasks) return res.json({success: false, message: 'no tasks available'});
        return res.json({
            success: true,
            message: 'tasks found',
            data: tasks
        })
    });

});

router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let id = req.params.id;

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

router.post('/create', requestValidation({content: 'www-encoded'}), passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        lastUpdate: Date.now(),
        complete: false,
        user: req.user._id
    });

    Task.addTask(newTask, (err, task) => {
        if(err){
            res.json({success: false, message: 'failed to add task', data:task})
        }else{
            res.json({success: true, message: 'task added', data: task})
        }
    });

});

router.post('/update', requestValidation({content: 'www-encoded'}), passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let updatedTask = new Task({
        _id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        lastUpdate: Date.now(),
        complete: req.body.complete ,
        user: req.user._id
    });

    Task.updateTask(updatedTask, (err, task) => {
        if(err){
            res.json({success: false, message: 'failed to update task', data: task})
        }else{
            res.json({success: true, message: 'task updated', data: task})
        }
    });

});

router.post('/delete', requestValidation({content: 'www-encoded'}), passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let id = req.body._id;
    
    Task.deleteTask(id, (err, task) => {
        if(err){
            res.json({success: false, message: 'failed to delete task', data: task})
        }else{
            res.json({success: true, message: 'task deleted', data: task})
        }
    });

});


module.exports = router;