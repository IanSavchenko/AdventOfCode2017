let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8').trim().split(',');

let x = 0;
let y = 0;

let max = 0;

let dist = () => Math.max(x, y);

data.forEach(move => {
    if (move.includes('n')) {
        y += 1;
    }

    if (move.includes('s')) {
        y -= 1;
    }

    if (move.includes('e')) {
        x += 1;
    }

    if (move.includes('w')) {
        x -=1;
    }

    if (dist() > max) {
        max = dist();
    }
});

console.log(`Part 1: ${dist()}`); // 650
console.log(`Part 2: ${max}`); // 1465