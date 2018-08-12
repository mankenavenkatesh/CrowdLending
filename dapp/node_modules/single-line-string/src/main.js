/**
 * Removes whitespace and newlines from an ES6 template literal
 * @param {strings} template literal
 * @param {values} one or more data values such as a number, string, array, etc.
 * @return {string}
 */ 
export default (strings, ...values) => {
  // Interweave the strings with the
  // substitution vars first.
  let output = '';
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  let lines = output.split(/(?:\r\n|\n|\r)/);

  // Rip out the leading whitespace.
  return lines.map((line) => {
    return line.replace(/^\s+/gm, '');
  }).join(' ').trim();
}
