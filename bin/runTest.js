#! /usr/bin/env node
const path = require('path');

// get the target file
const targetFile = process.argv[2];

console.log('Target file: ', targetFile);

const { testcases, validator } = require(path.join('../', targetFile));

let failed = [];
testcases.forEach((testcase, index) => {
  try {
    validator(testcase);
    console.log(`Testcase ${index} passed`);
  } catch (err) {
    failed.push({
      index,
      err
    });
    console.log(`Testcase ${index} failed`);
  }
});

if (failed.length === 0) {
  console.log(`Testcases all passed! :D`);
} else {
  console.log(`Total ${failed.length} testcases failed... :(`);
  failed.forEach(({ index, err }) => {
    console.log(`Testcase ${index} err:`, err);
  });
}
