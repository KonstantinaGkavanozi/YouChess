// Auto-Generated code from Swaggerhub
'use strict';

var utils = require('../utils/writer.js');
var Coach = require('../service/CoachService');

module.exports.getCoach = function getCoach (req, res, next, coachID) {
  Coach.getCoach(coachID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postCoach = function postCoach (req, res, next, body) {
  Coach.postCoach(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
