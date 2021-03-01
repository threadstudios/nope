'use strict';

function uncurryThis(fn) {
  return function () {
    return Function.call.apply(fn, arguments);
  };
}

const hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

function isObj(obj) {
  return obj !== null && typeof obj === 'object';
}

function prop(obj, path) {
  if (!isObj(obj) || typeof path !== 'string') {
    return obj;
  }
  const pathArr = path.split('.');
  for (var i = 0; i < pathArr.length; i++) {
    const p = pathArr[i];
    obj = hasOwnProperty(obj, p) ? obj[p] : null;
    if (obj === null) {
      break;
    }
  }
  return obj;
}

function nope(string, data, options) {
  options = options || { skipUndefined: false, throwOnUndefined: false };

  const regex = /{{2}(.+?)}{2}/g;
  let result;
  let formattedString = string;

  while ((result = regex.exec(string)) !== null) {
    const formatter = result[1].split('|');
    const item = formatter[0].trim();
    if (item) {
      let value = prop(data, item);
      if (value !== undefined && value !== null) {
        if (formatter[1]) {
          const formatFn = formatter[1].trim();
          value = options[formatFn](value);
        }
        formattedString = formattedString.replace(result[0], value);
      }
    }
  }
  return formattedString;
}

module.exports = { nope, prop };
