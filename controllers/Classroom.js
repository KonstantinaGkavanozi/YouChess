'use strict';

var utils = require('../utils/writer.js');
var Classroom = require('../service/ClassroomService');

module.exports.getClassroom = function getClassroom (req, res, next, groupID) {
  Classroom.getClassroom(groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.groupGroupIDClassroomSetEditorPOST = function groupGroupIDClassroomSetEditorPOST (req, res, next, groupID, userID) {
  Classroom.groupGroupIDClassroomSetEditorPOST(groupID, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateClassroom = function updateClassroom (req, res, next, body, groupID) {
  Classroom.updateClassroom(body, groupID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
