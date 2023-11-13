'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.booksBookIdBorrowPOST = function booksBookIdBorrowPOST (req, res, next, body, bookId) {
  Default.booksBookIdBorrowPOST(body, bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksBookIdDELETE = function booksBookIdDELETE (req, res, next, bookId) {
  Default.booksBookIdDELETE(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksBookIdGET = function booksBookIdGET (req, res, next, bookId) {
  Default.booksBookIdGET(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksBookIdReturnPOST = function booksBookIdReturnPOST (req, res, next, body, bookId) {
  Default.booksBookIdReturnPOST(body, bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksGET = function booksGET (req, res, next) {
  Default.booksGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksPOST = function booksPOST (req, res, next, body) {
  Default.booksPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersGET = function usersGET (req, res, next) {
  Default.usersGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersPOST = function usersPOST (req, res, next, body) {
  Default.usersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdBorrowingsGET = function usersUserIdBorrowingsGET (req, res, next, userId) {
  Default.usersUserIdBorrowingsGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdDELETE = function usersUserIdDELETE (req, res, next, userId) {
  Default.usersUserIdDELETE(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdGET = function usersUserIdGET (req, res, next, userId) {
  Default.usersUserIdGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdPUT = function usersUserIdPUT (req, res, next, body, userId) {
  Default.usersUserIdPUT(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
