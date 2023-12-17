'use strict';


/**
 * Get coach by ID
 *
 * coachID Long Coach ID to get
 * returns Coach
 **/
exports.getCoach = function(coachID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "John Doe",
  "groupsCreated" : [ 198772, 32224, 44221 ],
  "ID" : 8765
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new coach given their name
 *
 * body Coach_body JSON object with the studentID and groupID
 * returns Coach
 **/
exports.postCoach = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "John Doe",
  "groupsCreated" : [198772, 32224, 44221],
  "ID" : 8765
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

