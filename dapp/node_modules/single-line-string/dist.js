'use strict';

var main = (function (strings) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  // Interweave the strings with the
  // substitution vars first.
  var output = '';
  for (var i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  var lines = output.split(/(?:\r\n|\n|\r)/);

  // Rip out the leading whitespace.
  return lines.map(function (line) {
    return line.replace(/^\s+/gm, '');
  }).join(' ').trim();
});

module.exports = main;
