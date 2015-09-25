var Standup = require('../models/standup.server.model.js');

exports.list = function(req, res) {
    var query = Standup.find();

    query.sort({
            createdOn: 'desc'
        })
        .limit(12)
        .exec(function(err, results) {
            res.render('index', {
                title: 'Standup - List',
                notes: results
            });
        });
};

exports.filterByMember = function(req, res) {
    var query = Standup.find();
    var filter = req.body.memberName;

    query.sort({
        createdOn: 'desc'
    });

    if (filter.length > 0) {
        query.where({
            memberName: filter
        });
    }

    query.exec(function(err, results) {
        res.render('index', {
            title: 'Standup - List',
            notes: results
        });
    });
};

exports.create = function(req, res) {
    var entry = new Standup({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });

    //validate now...
    entry.schema.path('memberName').validate(function(value) {
        return value != 'None';
    }, 'You must select a team member name.');


    entry.save(function(err) {
        if (err) {
            var errMsg = 'Sorry, there was an error saving the standup meeting notes. ' + err;
            res.render('newnote', {
                title: 'Standup - New note (error)',
                message: errMsg
            });
        } else {
            console.log('standup meeting note was saved!');
            //redirected to home page to display list of notes...
            res.redirect(301, '/');
        }
    });
};

exports.getNote = function(req, res) {
    res.render('newnote', {
        title: 'Standup -New Note'
    });
};
