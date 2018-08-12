# Single Line String
Simple tag function that converts a multiline ES6 template literal to a single line
string, removing extra whitespace. Requires a javascript environment that supports 
[es6 template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
(eg: Node >= 4.7.0).

## Usage
ES6

```javascript
import sls from 'single-line-string';

var name = 'June';
const hello = sls`
  Hey,
        hello,
  how
    are
              you
  ${name}?
`

console.log(hello); // outputs: "Hey, hello, how are you June?"
```

or via Common JS

```javascript
var sls = require('single-line-string');
var name = 'June';
var hello = sls`
  Hey,
        hello,
  how
    are
              you
  ${name}?
`;

console.log(hello); // outputs: "Hey, hello, how are you June?"
```

## Install
`npm install single-line-string`

## Build
`npm install && npm run build`

## Test
`npm run test`

## Credits
code credit: https://muffinresearch.co.uk/removing-leading-whitespace-in-es6-template-strings/
