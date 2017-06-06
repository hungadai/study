# study

# Run testcases

`runTest.js` is a command line tool helping you to run through every testcase and output the results in the console log.
```
Adas-iMac:study adahung$ node ./bin/runTest.js ./algorithm/dynamic-programming/fibonacci.js
Target file:  ./algorithm/dynamic-programming/fibonacci.js
Testcase 0 passed
Testcase 1 passed
Testcase 2 passed
Testcase 3 passed
Testcase 4 passed
Testcases all passed! :D
```


The target file should export `testcases` and `validator`. `testcases` is an array of testcases and every testcase will be validated by `validator`. `validator` should always throw errors if the testcase failed. Using [assert](https://nodejs.org/api/assert.html) in your validator!

Example:
```
const testcases = [
  {
    input: [0.1, 0.3, 0.4, 0.4, 0.8],
    expected: [0, 0, 0, 1, 1]
  }
];
const validator = ({ input, expected }) => {
    const output = round(input);
    assert.deepEqual(output, expected);
};

module.exports = {
  testcases,
  validator
};
```
