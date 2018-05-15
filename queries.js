var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/presencetracker';
var db = pgp(connectionString);

// add query functions

function getAllWorkers(req, res, next) {
  db.any('select * from worker')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL workers'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllMeetings(req, res, next) {
  db.any('select * from meetings')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL meetings'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createWorker(req, res, next) {
  db.none('insert into worker(firstname, lastname)' +
      'values(${firstname}, ${lastname})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one worker'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createMeeting(req, res, next) {
  db.none('insert into meeting(workerID, date, arrivaltime, arrivedontime)' +
      'values(${workerId}, ${date}, ${arrivalTime}, ${arrivedOnTime})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one meeting'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateWorker(req, res, next) {
  db.none('update worker set firstname=$1, lastname=$2 where Id=$3',
    [req.body.firstName, req.body.lastName, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated worker'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeWorker(req, res, next) {
  var workerID = parseInt(req.params.id);
  db.result('delete from worker where id = $1', workerID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} worker(s)`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllWorkers: getAllWorkers,
  // getSingleWorker: getSingleWorker,
  createWorker: createWorker,
  updateWorker: updateWorker,
  removeWorker: removeWorker,
  getAllMeetings: getAllMeetings,
  createMeeting: createMeeting
};

