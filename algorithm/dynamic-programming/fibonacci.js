const assert = require('assert');

// http://www.geeksforgeeks.org/dynamic-programming-set-1/
// 1) Overlapping Subproblems
//
// a) Recursive solution
// b) Memoized solution
// c) Tabulated solution
//

function fibonacciRecursion (n) {
  if (n <= 2) {
    return 1;
  }
  return fibonacciRecursion(n - 1) + fibonacciRecursion(n - 2);
}

const lookup = [];
function fibonacciMemoized (n) {
  if (!lookup[n]) {
    if (n <= 2) {
      lookup[n] = 1;
    } else {
      lookup[n] = fibonacciMemoized(n - 1) + fibonacciMemoized(n - 2);
    }
  }

  return lookup[n];
}

function fibonacciTabulated (n) {
  const lookup = [];
  lookup[0] = 1;
  lookup[1] = 1;
  for (let i=2; i<n; i++) {
    lookup[i] = lookup[i - 1] + lookup[i - 2];
  }
  return lookup[n - 1];
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
    assert.equal(fibonacciRecursion(input), expected);
    assert.equal(fibonacciMemoized(input), expected);
    assert.equal(fibonacciTabulated(input), expected);
};

module.exports = {
  testcases,
  validator,
}
