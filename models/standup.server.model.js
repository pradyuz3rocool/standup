var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberNameValidator = [
    function(val) {
        return (val.length > 0 && val.toLocaleLowerCase() != 'none');
    },
    //custom error text...
    'select a valid member name.'
];

var requriredStringValidator = [
    function(val){
        var testVal = val.trim();
        return (testVal.length > 0);
    },
    //Custom error text...
    '{PATH}  cannot be empty'
];
var standupSchema = new Schema({

    memberName: {
        type: String,
        requrired: true,
        validate: memberNameValidator
    },
    project: {
        type: String,
        requrired: true,
        validate: requriredStringValidator
    },
    workYesterday: {
        type: String,
        requrired: true,
        validate: requriredStringValidator
    },
    workToday: {
        type: String,
        requrired: true,
        validate: requriredStringValidator
    },
    impediment: {
        type: String,
        requrired: true,
        default: 'none'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

//Export model...
module.exports = mongoose.model('Standup', standupSchema);
