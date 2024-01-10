// Auto-Generated code from Swaggerhub
'use strict';

var utils = require('../utils/writer.js');
var Group = require('../service/GroupService');

module.exports.createGroup = function createGroup (req, res, next, body) {
  Group.createGroup(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteGroup = function deleteGroup (req, res, next, groupID) {
  Group.deleteGroup(groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.enrollStudent = function enrollStudent (req, res, next, body) {
  Group.enrollStudent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findAvailableGroups = function findAvailableGroups (req, res, next, price_min, price_max, level, sortBy) {
  Group.findAvailableGroups(price_min, price_max, level, sortBy)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGroup = function getGroup (req, res, next, groupID) {
  Group.getGroup(groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.unenrollStudent = function unenrollStudent (req, res, next, body) {
  Group.unenrollStudent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
