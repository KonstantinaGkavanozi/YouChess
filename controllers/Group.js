// Auto-Generated code from Swaggerhub for Group
'use strict';

var utils = require('../utils/writer.js');
var Group = require('../service/GroupService');

// Creating the createGroup function
module.exports.createGroup = function createGroup (req, res, next, body) {
  Group.createGroup(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Creating the deleteGroup function
module.exports.deleteGroup = function deleteGroup (req, res, next, groupID) {
  Group.deleteGroup(groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Creating the enrollStudent function
module.exports.enrollStudent = function enrollStudent (req, res, next, body) {
  Group.enrollStudent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Creating the findAvailableGroups function
module.exports.findAvailableGroups = function findAvailableGroups (req, res, next, price_min, price_max, level, sortBy) {
  Group.findAvailableGroups(price_min, price_max, level, sortBy)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Creating the getGroup function
module.exports.getGroup = function getGroup (req, res, next, groupID) {
  Group.getGroup(groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Creating the unenrollStudent function
module.exports.unenrollStudent = function unenrollStudent (req, res, next, body) {
  Group.unenrollStudent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
