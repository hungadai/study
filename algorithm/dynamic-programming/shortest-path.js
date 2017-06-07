const assert = require('assert');

// http://www.geeksforgeeks.org/dynamic-programming-set-2-optimal-substructure-property/
//
// 2) Optimal Substructure: A given problems has Optimal Substructure Property if optimal solution of the given problem can be obtained by using optimal solutions of its subproblems.
//
// For example, the Shortest Path problem has following optimal substructure property:
// If a node x lies in the shortest path from a source node u to destination node v then the shortest path from u to v is combination of shortest path from u to x and shortest path from x to v. The standard All Pair Shortest Path algorithms like Floyd–Warshall and Bellman–Ford are typical examples of Dynamic Programming.

// Floyd–Warshall

// function floydWarshallAlgorithm (graph) {
//   const dists = [];
//   const nodeLength = graph.nodes.length;
//   let i, j, k;
//
//   // initialization. set max to every pair of vertices
//   for (i = 0; i < nodeLength; i++) {
//     const distForI = [];
//     for (j = 0; j < nodeLength; j++) {
//       if (j === i) {
//         distForI[j] = 0;
//       } else {
//         distForI[j] = Number.MAX_VALUE;
//       }
//     }
//     dists[i] = distForI;
//   }
//
//   // edges
//   graph.edges.forEach(([from, to, weight]) => {
//     dists[from - 1][to - 1] = weight;
//   });
//
//   // start Floyd-Warshall algorithm
//   for (k = 0; k < nodeLength; k++) {
//     for (i = 0; i < nodeLength; i++) {
//       for (j = 0; j < nodeLength; j++) {
//         if (i !== j && i !== k && dists[i][j] > dists[i][k] + dists[k][j]) {
//           dists[i][j] = dists[i][k] + dists[k][j];
//         }
//       }
//     }
//   }
//   return dists;
// }
//
// const dists = floydWarshallAlgorithm(graph);
// function findShortestDistance ([ from, to ]) {
//   return dists[from - 1][to - 1];
// }

// small modifications to the original floydWarshallAlgorithm in order to reconstruct the shortest path
function floydWarshallAlgorithmWithPaths (graph) {
  const dists = [];
  const next = [];
  const nodeLength = graph.nodes.length;
  let i, j, k;

  // initialization. set max to every pair of vertices
  for (i = 0; i < nodeLength; i++) {
    const distForI = [];
    const nextForI = [];
    for (j = 0; j < nodeLength; j++) {
      if (j === i) {
        distForI[j] = 0;
      } else {
        distForI[j] = Number.MAX_VALUE;
      }
      nextForI[j] = null;
    }
    dists[i] = distForI;
    next[i] = nextForI;
  }

  // edges
  graph.edges.forEach(([from, to, weight]) => {
    dists[from - 1][to - 1] = weight;
    next[from - 1][to - 1] = to - 1;
  });

  // start Floyd-Warshall algorithm
  for (k = 0; k < nodeLength; k++) {
    for (i = 0; i < nodeLength; i++) {
      for (j = 0; j < nodeLength; j++) {
        if (i !== j && i !== k && dists[i][j] > dists[i][k] + dists[k][j]) {
          dists[i][j] = dists[i][k] + dists[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }
  return {
    dists,
    next,
  };
}

const graph = {
  nodes: [1, 2, 3, 4],
  edges: [
    [ 1, 3, -2 ],
    [ 2, 1, 4 ],
    [ 2, 3, 3 ],
    [ 3, 4, 2 ],
    [ 4, 2, -1 ]
  ]
};
const distsWithNext = floydWarshallAlgorithmWithPaths(graph);

function findShortestPath ([ from, to ]) {
  const { dists, next } = distsWithNext;
  const path = [ from ];

  while (next[ path[path.length - 1] - 1 ][ to - 1 ] !== null && path[ path.length - 1 ] !== to) {
    path.push(next[ path[path.length - 1] - 1 ][ to - 1 ] + 1);
  }

  return {
    dist: dists[from - 1][to - 1],
    path
  };
}

const testcases = [
  {
    input: [ 1, 2 ],
    expected: {
      dist: -1,
      path: [ 1, 3, 4, 2 ],
    }
  },
  {
    input: [ 3, 2 ],
    expected: {
      dist: 1,
      path: [ 3, 4, 2 ],
    }
  },
  {
    input: [ 4, 2 ],
    expected: {
      dist: -1,
      path: [ 4, 2 ],
    }
  },
  {
    input: [ 2, 4 ],
    expected: {
      dist: 4,
      path: [ 2, 1, 3, 4 ],
    }
  },
  {
    input: [ 3, 1 ],
    expected: {
      dist: 5,
      path: [ 3, 4, 2, 1 ],
    }
  }
];

const validator = ({ input, expected }) => {
  const { dist, path } = findShortestPath(input);
  assert.equal(dist, expected.dist);
  assert.deepEqual(path, expected.path);
}

module.exports = {
  testcases,
  validator
};
