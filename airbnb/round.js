const assert = require('assert');

// https://discuss.leetcode.com/topic/246/round-numbers
//
// Was asked in airbnb phone screen
//
// When you book on airbnb the total price is:
//
// Total price = base price + service fee + cleaning fee + ...
//
// input : array of decimals ~ X
// output : array of int ~ Y
//
// But they need to satisfy the condition:
//
// sum(Y) = round(sum(x))
// minimize (|y1-x1| + |y2-x2| + ... + |yn-xn|)
// Example1:
// input = 30.3, 2.4, 3.5
// output = 30 2 4
//
// Example2:
// input = 30.9, 2.4, 3.9
// output = 31 2 4

// https://stackoverflow.com/questions/792460/how-to-round-floats-to-integers-while-preserving-their-sum
//
// Let's say I have an array of floating point numbers, in sorted (let's say ascending) order, whose sum is known to be an integer N. I want to "round" these numbers to integers while leaving their sum unchanged. In other words, I'm looking for an algorithm that converts the array of floating-point numbers (call it  fn) to an array of integers (call it in) such that:
//
// the two arrays have the same length
// the sum of the array of integers is N
// the difference between each floating-point number fn[i] and its corresponding integer in[i] is less than 1 (or equal to 1 if you really must)
// given that the floats are in sorted order (fn[i] <= fn[i+1]), the integers will also be in sorted order (in[i] <= in[i+1])
// Given that those four conditions are satisfied, an algorithm that minimizes the rounding variance (sum((in[i] - fn[i])^2)) is preferable, but it's not a big deal.
//
// Examples:
//
// [0.02, 0.03, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14]
//   => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
// [0.1, 0.3, 0.4, 0.4, 0.8]
//   => [0, 0, 0, 1, 1]
// [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
//   => [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
// [0.4, 0.4, 0.4, 0.4, 9.2, 9.2]
//   => [0, 0, 1, 1, 9, 9] is preferable
//   => [0, 0, 0, 0, 10, 10] is acceptable
// [0.5, 0.5, 11]
//   => [0, 1, 11] is fine
//   => [0, 0, 12] is technically not allowed but I'd take it in a pinch

// [0.1, 0.3, 0.4, 0.4, 0.8]
//    => [0, 0, 0, 1, 1]

function round(floats) {
  const ints = floats.map((floatNum) => Math.floor(floatNum));
  const diff = floats.map((floatNum, index) => ({
      value: floatNum - ints[index],
      index
  })).sort((diffA, diffB) => {
    if (diffA.value === diffB.value) {
        return diffB.index - diffA.index;
    }
    return diffB.value - diffA.value;
  });

  const floatSum = floats.reduce((accu, current) => accu + current, 0);
  const intSum = ints.reduce((accu, current) => accu + current, 0);
  let diffSum = floatSum - intSum;
  let i = 0;
  while (diffSum > 0) {
    ints[diff[i].index]++;
    diffSum--;
    i++;
  }

  return ints;
}

const testcases = [
  {
    input: [0.1, 0.3, 0.4, 0.4, 0.8],
    expected: [0, 0, 0, 1, 1]
  },
  {
    input: [0.02, 0.03, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14],
    expected: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  },
  {
    input: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    expected: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  },
  {
    input: [0.4, 0.4, 0.4, 0.4, 9.2, 9.2],
    expected: [0, 0, 1, 1, 9, 9]
  },
  {
    input: [0.5, 0.5, 11],
    expected: [0, 1, 11]
  },
];

const validator = ({ input, expected }) => {
    const output = round(input);
    assert.deepEqual(output, expected);
};

module.exports = {
  testcases,
  validator,
};
