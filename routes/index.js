var express = require('express');
var router = express.Router();
var standupCtrl = require('../controllers/standup.server.controller');


/*Get Home Page. */
router.get('/', function(req, res) {
    return standupCtrl.list(req, res);
});

/*POST filter by member name - home page. */
router.post('/',function(req,res){
  	return standupCtrl.filterByMember(req, res);
});

/* Get New Note page. */
router.get('/newnote', function(req, res) {
    return standupCtrl.getNote(req, res);
});

/* Post New Note page. */
router.post('/newnote', function(req, res) {
    return standupCtrl.create(req, res);
});


module.exports = router;
