let _ = require('lodash');
let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');

// PART 1
let result1 = 0;
let prev = -1;

for (var char of data) {
    let num = Number(char);
    if (prev == num) {
        result1 += num;
    }

    prev = num;
}

if (data.length > 1 && _.first(data) == _.last(data)) {
    result1 += Number(_.first(data));
}

console.log(`Part 1: ${result1}`); // 1141 

// PART 2
let result2 = 0;
let half = data.length / 2;
for (let i = 0; i < half; i++) {
    if (data[i] == data[i + half]) {
        result2 += Number(data[i]) * 2;
    }
}

console.log(`Part 2: ${result2}`); // 950
