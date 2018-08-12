var test = require('tape');
var sls = require('../dist.js');

test('makes a mulit-line string a single line string', function(t) {
  var hello = sls`
    Hey
            hello
      how
         are
    you?
  `;
  t.equal(hello, 'Hey hello how are you?');
  t.end();
});

test('accepts a variable using ${} notation', function(t) {
  var name = 'Jude';
  var heyJude = sls`
    Hey
    ${name},
    don't be
    afraid.
  `;
  t.equal(heyJude, 'Hey Jude, don\'t be afraid.');
  t.end();
});
