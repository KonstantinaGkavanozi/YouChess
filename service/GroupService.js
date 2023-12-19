'use strict';


/**
 * Create a new group
 *
 * body GroupIn FR1-The coach must be able to create groups
 * returns GroupOut
 **/
exports.createGroup = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "schedule" : "5 O'clock every Monday",
  "level" : "Intermediate",
  "price" : 10.5,
  "availableSeats" : 5,
  "ID" : 10,
  "studentIDs" : [ 198772, 32224, 44221 ],
  "coachID" : 8765
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a group
 * FR2 - The coach must be able to delete groups
 *
 * groupID Long Group ID to delete
 * no response value expected for this operation
 **/
exports.deleteGroup = function(groupID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

// Implemented simple logic to be able to develop more acuurate unit tests

/**
 * Enroll a student in a group
 * FR5 - The student must be able to enroll in an available group
 *
 * body Groups_enroll_body JSON object with the studentID and groupID
 * returns groups_enroll_body
 **/
exports.enrollStudent = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = body;
    // Swagger generated code
    // examples['application/json'] = {
    //   "studentID" : 0,
    //   "groupID" : 6
    // };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

// Implemented logic to be able to develop more acuurate unit tests

/**
 * Find available groups
 * FR3,FR4 - The student must be able to see a list of available groups, and filter them by their attributes
 *
 * price_min Long Min price value that needs to be considered for filtering (optional)
 * price_max Long Max price value that needs to be considered for filtering (optional)
 * level String Level that needs to be considered for filtering (optional)
 * sortBy String Sorting method that needs to be considered for filtering (optional)
 * returns List
 **/
exports.findAvailableGroups = function(price_min,price_max,level,sortBy) {
  return new Promise(function(resolve, reject) {
    var examples = {};

    if (price_min === undefined){
      price_min = -1;
    }

    if (price_max === undefined){
      price_max = Infinity;
    }

    if (level === undefined){
      level = ["Beginner", "Intermediate", "Advanced"];
    }
    else{
      if (["Beginner", "Intermediate", "Advanced"].includes(level)){
        level = [level];
      }
      else{
        reject();
      }
    }

    const db = [
      {
        "schedule" : "5 O'clock every Monday",
        "level" : "Advanced",
        "price" : 12,
        "availableSeats" : 2,
        "ID" : 1,
        "studentIDs" : [ 198772, 32224, 44221 ],
        "coachID" : 8765
      },
      {
        "schedule" : "5 O'clock every Monday",
        "level" : "Intermediate",
        "price" : 5,
        "availableSeats" : 5,
        "ID" : 2,
        "studentIDs" : [ 198772, 32224, 44221 ],
        "coachID" : 8765
      },
      {
        "schedule" : "5 O'clock every Monday",
        "level" : "Intermediate",
        "price" : 10.5,
        "availableSeats" : 4,
        "ID" : 3,
        "studentIDs" : [ 198772, 32224, 44221 ],
        "coachID" : 8765
      },
      {
        "schedule" : "5 O'clock every Monday",
        "level" : "Intermediate",
        "price" : 20,
        "availableSeats" : 5,
        "ID" : 4,
        "studentIDs" : [ 198772, 32224, 44221 ],
        "coachID" : 8765
      },
      {
        "schedule" : "5 O'clock every Monday",
        "level" : "Beginner",
        "price" : 7,
        "availableSeats" : 1,
        "ID" : 5,
        "studentIDs" : [ 198772, 32224, 44221 ],
        "coachID" : 8765
      }
    ]

    examples['application/json'] = [];

    for (const group of db){
      if (
        price_min <= group.price
        && group.price <= price_max
        && level.includes(group.level)
      ){
        examples['application/json'].push(group);
      }
    }

    if (sortBy !== undefined){
      if (sortBy === "price_asc"){
        var sorting_func = function(a, b){return a.price - b.price};
      }
      else if (sortBy === "price_desc") {
        var sorting_func = function(a, b){return b.price - a.price};
      } else if (sortBy === "availableSeats_desc"){
        var sorting_func = function(a, b){return b.availableSeats - a.availableSeats};
      }
      else{
        reject();
      }

      examples['application/json'].sort(sorting_func);
    }

    // Swagger generated code
    // examples['application/json'] = [ {
    //   "schedule" : "5 O'clock every Monday",
    //   "level" : "Intermediate",
    //   "price" : 10.5,
    //   "availableSeats" : 5,
    //   "ID" : 10,
    //   "studentIDs" : [ 198772, 32224, 44221 ],
    //   "coachID" : 8765
    // }, {
    //   "schedule" : "5 O'clock every Monday",
    //   "level" : "Intermediate",
    //   "price" : 10.5,
    //   "availableSeats" : 5,
    //   "ID" : 10,
    //   "studentIDs" : [ 198772, 32224, 44221 ],
    //   "coachID" : 8765
    // } ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get group by ID
 * FR6 - The user must be able to see the groups they are in
 *
 * groupID Long Group ID to get
 * returns GroupOut
 **/
exports.getGroup = function(groupID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "schedule" : "5 O'clock every Monday",
  "level" : "Intermediate",
  "price" : 10.5,
  "availableSeats" : 5,
  "ID" : groupID,
  "studentIDs" : [198772,32224,44221],
  "coachID" : 8765
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Unenroll a student from a group
 * FR7 - The student must be able to leave a group
 *
 * body Groups_unenroll_body JSON object with the studentID and groupID
 * returns GroupOut
 **/
exports.unenrollStudent = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "schedule" : "5 O'clock every Monday",
  "level" : "Intermediate",
  "price" : 10.5,
  "availableSeats" : 5,
  "ID" : 10,
  "studentIDs" : [ 198772, 32224, 44221 ],
  "coachID" : 8765
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

