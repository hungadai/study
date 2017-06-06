const assert = require('assert');

// http://www.geeksforgeeks.org/dynamic-programming-set-1/
// 1) Overlapping Subproblems
//
// a) Recursive solution
// b) Memoized solution
// c) Tabulated solution
//

function fibonacci (n) {
  if (n <= 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const testcases = [
  {
    input: 1,
    expected: 1
  },
  {
    input: 3,
    expected: 2
  },
  {
    input: 7,
    expected: 13
  },
  {
    input: 11,
    expected: 89
  },
  {
    input: 12,
    expected: 144
  },
];

const validator = ({ input, expected }) => {
    assert.equal(fibonacci(input), expected);
};

module.exports = {
  testcases,
  validator,
}
