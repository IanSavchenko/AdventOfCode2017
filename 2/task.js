let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8');
let rows = data.split('\n').map(row => row.split('\t').map(num => Number(num)));

// PART 1
let result1 = 0;
for (let row of rows) {
    result1 += _.max(row) - _.min(row);
}

console.log(`Part 1: ${result1}`); // 42299

// PART 2
let result2 = 0;

for (let row of rows) {
    let nums = row;
    for (let i = 0; i < nums.length - 1; i++) {
        for (j = i + 1; j < nums.length; j++) {
            if (nums[i] % nums[j] == 0) {
                result2 += nums[i] / nums[j];
                break;
            }

            if (nums[j] % nums[i] == 0) {
                result2 += nums[j] / nums[i];
                break;
            }
        }
    }
}

console.log(`Part 2: ${result2}`); // 277