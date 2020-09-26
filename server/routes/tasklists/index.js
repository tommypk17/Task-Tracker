const express = require('express');
const router = express.Router();
const passport = require('passport');
const Task = require('../../models/task');
const TaskList = require('../../models/tasklist');
const requestValidation = require('../../middleware/requestValidation');


router.get('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let user = req.user;

    TaskList.getTaskLists(user, (err, tasklists) => {
        if (err) throw err;
        if (!tasklists) return res.json({success: false, message: 'no tasks available'});
        return res.json({
            success: true,
            message: 'tasklists found',
            data: tasklists
        })
    });

});

router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let id = req.params.id;

    TaskList.getTaskList(id, (err, tasklist) => {
        if (err) throw err;
        if (!tasklist) return res.json({success: false, message: 'no tasklists available'});
        return res.json({
            success: true,
            message: 'tasklist found',
            data: tasklist
        })
    });

});

router.post('/create', requestValidation({content: 'json'}), passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let newTaskList = new TaskList({
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        user: req.user._id
    });

    Task.addTask(newTaskList, (err, tasklist) => {
        if(err){
            res.json({success: false, message: 'failed to add tasklist', data:tasklist})
        }else{
            res.json({success: true, message: 'tasklist added', data: tasklist})
        }
    });

});

router.post('/update', requestValidation({content: 'json'}), passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let updatedTaskList = new TaskList({
        _id: req.body.id,
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        user: req.user._id
    });

    TaskList.updateTaskList(updatedTaskList, (err, tasklist) => {
        if(err){
            res.json({success: false, message: 'failed to update tasklist', data: tasklist})
        }else{
            res.json({success: true, message: 'tasklist updated', data: tasklist})
        }
    });

});

router.post('/delete', requestValidation({content: 'json'}), passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let id = req.body.id;

    TaskList.deleteTaskList(id, (err, tasklist) => {
        if(err){
            res.json({success: false, message: 'failed to delete tasklist', data: tasklist})
        }else{
            res.json({success: true, message: 'tasklist deleted', data: tasklist})
        }
    });

});


module.exports = router;