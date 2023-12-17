'use strict';


/**
 * Get student by ID
 *
 * studentID Long Student ID to get
 * returns Student
 **/
exports.getStudent = function(studentID) {
  return new Promise(function(resolve, reject) {
    var examples = {};

    if (typeof studentID !== 'number' && typeof studentID !== 'bigint') {
      reject('Invalid input: studentID should not be a string.');
      return;
    }
    examples['application/json'] = {
  "name" : "Jane Smith",
  "ID" : studentID,
  "groupsEnrolled" : [123, 124, 125]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }

    // if (examples.hasOwnProperty(studentID)) {
    //   // If the provided studentID is valid, return the student information
    //   resolve(examples[studentID]);
    // } else {
    //   // If the provided studentID is not valid, return an error
    //   reject(new Error('Student not found'));
    //   // console.log("Student not found");
    // }
  });
}
