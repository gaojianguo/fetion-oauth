'use strict';

/**
 * 对返回结果的一层封装，如果遇见微信返回的错误，将返回一个错误
 */
exports.wrapper = function (callback) {
  return function (err, data, res) {
    callback = callback || function () {};
    if (err) {
      err.name = 'FetionAPI' + err.name;
      return callback(err, data, res);
    }
    if (data.errcode) {
      err = new Error(data.errormsg);
      err.name = 'FetionAPIError';
      err.code = data.errcode;
      err.msg = data.errormsg || '';
      return callback(err, data, res);
    }
    callback(null, data, res);
  };
};
