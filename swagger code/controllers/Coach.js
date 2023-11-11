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
