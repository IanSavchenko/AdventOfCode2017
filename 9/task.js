let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8').trim();

let depth = 0;
let garbage = false;

let score = 0;
let garbageNum = 0;

for (let i = 0; i < data.length; i++) {
    let symbol = data[i];
    if (garbage) {
        if (symbol == '>') {
            garbage = false;
        } else if (symbol == '!') {
            i++;
        } else {
            garbageNum++;
        }
    } else if (symbol == '<') {
        garbage = true;
    } else if (symbol == '{') {
        score += ++depth;
    } else if (symbol == '}') {
        depth--;
    }
}

console.log(`Part 1: ${score}`); // 17537
console.log(`Part 2: ${garbageNum}`); // 7539