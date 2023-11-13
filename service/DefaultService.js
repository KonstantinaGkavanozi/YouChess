'use strict';


/**
 * Borrow a book
 *
 * body BorrowRequest 
 * bookId Integer 
 * no response value expected for this operation
 **/
exports.booksBookIdBorrowPOST = function(body,bookId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a book
 *
 * bookId Integer 
 * no response value expected for this operation
 **/
exports.booksBookIdDELETE = function(bookId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get details of a book
 *
 * bookId Integer 
 * returns Book
 **/
exports.booksBookIdGET = function(bookId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "author" : "author",
  "isbn" : "isbn",
  "available" : true,
  "id" : 0,
  "title" : "title"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Return a borrowed book
 *
 * body ReturnRequest 
 * bookId Integer 
 * no response value expected for this operation
 **/
exports.booksBookIdReturnPOST = function(body,bookId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a list of books
 *
 * returns List
 **/
exports.booksGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "author" : "author",
  "isbn" : "isbn",
  "available" : true,
  "id" : 0,
  "title" : "title"
}, {
  "author" : "author",
  "isbn" : "isbn",
  "available" : true,
  "id" : 0,
  "title" : "title"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a new book
 *
 * body Book 
 * no response value expected for this operation
 **/
exports.booksPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a list of users
 *
 * returns List
 **/
exports.usersGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "id" : 0,
  "email" : "email"
}, {
  "name" : "name",
  "id" : 0,
  "email" : "email"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new user
 *
 * body User 
 * no response value expected for this operation
 **/
exports.usersPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a list of borrowed books by a user
 *
 * userId Integer 
 * returns List
 **/
exports.usersUserIdBorrowingsGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "dueDate" : "2000-01-23T04:56:07.000+00:00",
  "userId" : 0,
  "borrowDate" : "2000-01-23T04:56:07.000+00:00",
  "bookId" : 6
}, {
  "dueDate" : "2000-01-23T04:56:07.000+00:00",
  "userId" : 0,
  "borrowDate" : "2000-01-23T04:56:07.000+00:00",
  "bookId" : 6
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a user
 *
 * userId Integer 
 * no response value expected for this operation
 **/
exports.usersUserIdDELETE = function(userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get details of a user
 *
 * userId Integer 
 * returns User
 **/
exports.usersUserIdGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name",
  "id" : 0,
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update user details
 *
 * body UserUpdate 
 * userId Integer 
 * no response value expected for this operation
 **/
exports.usersUserIdPUT = function(body,userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

