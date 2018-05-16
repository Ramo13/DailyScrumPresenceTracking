var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/workers', db.getAllWorkers);
router.get('/api/meetings', db.getAllMeetings);
router.post('/api/workers', db.createWorker);
router.post('/api/meetings', db.createMeeting)
router.put('/api/workers/:id', db.updateWorker);
router.delete('/api/workers/:id', db.removeWorker);

module.exports = router;
