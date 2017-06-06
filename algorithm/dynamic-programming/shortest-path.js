const assert = require('assert');

// http://www.geeksforgeeks.org/dynamic-programming-set-2-optimal-substructure-property/
//
// 2) Optimal Substructure: A given problems has Optimal Substructure Property if optimal solution of the given problem can be obtained by using optimal solutions of its subproblems.
//
// For example, the Shortest Path problem has following optimal substructure property:
// If a node x lies in the shortest path from a source node u to destination node v then the shortest path from u to v is combination of shortest path from u to x and shortest path from x to v. The standard All Pair Shortest Path algorithms like Floyd–Warshall and Bellman–Ford are typical examples of Dynamic Programming.

// Floyd–Warshall


const graph = [
  [ 1, 3, -2 ],
  [ 2, 1, 4 ],
  [ 2, 3, 3 ],
  [ 3, 4, 2 ],
  [ 4, 2, -1 ]
];

function findShortestPath ([ from, to ]) {
  return 0;
}

const testcases = [
  {
    input: [ 1, 2 ],
    expected: -1
  },
  {
    input: [ 3, 2 ],
    expected: 1
  },
];

const validator = ({ input, expected }) => {
  assert.equal(findShortestPath(input), expected);
}

module.exports = {
  testcases,
  validator
};
