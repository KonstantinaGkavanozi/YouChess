'use strict';


/**
 * Get classroom by ID
 * FR8 - The group participants must be able to join the classroom
 *
 * groupID Long Classroom ID to get
 * returns Classroom
 **/
exports.getClassroom = function(groupID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "userList" : [ 198772, 32224, 44221 ],
  "ID" : 1234,
  "editingPermissionOwner" : 198772
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update studentID of the student who is allowed to edit the chessboard
 * FR10 - The coach must be able to change the ID of the student in controll of the Chessboard
 *
 * groupID Long Classroom ID for the chessboard
 * userID Long userID of the user who is allowed to edit the chessboard
 * no response value expected for this operation
 **/
exports.groupGroupIDClassroomSetEditorPOST = function(groupID,userID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update the classroom
 * FR12 - The coach must be able to change who has the permission to edit the chessboard
 *
 * body Classroom Classroom object with the updated user list and/or editing permission owner
 * groupID Long 
 * returns Classroom
 **/
exports.updateClassroom = function(body,groupID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = body;

    //     {
//   "userList" : [198772, 32224, 44221],
//   "ID" : 1234,
//   "editingPermissionOwner" : 198772
// };
  
    

    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

