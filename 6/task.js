let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8');
let cells = data.split('\t').map(num => Number(num));

let states = [];

while (!_.includes(states, cells.toString())) {
    states.push(cells.toString());

    let max = _.max(cells);
    let index = _.indexOf(cells, max);

    let value = cells[index];
    cells[index] = 0;

    while (value > 0) {
        index++;
        if (index == cells.length) {
            index = 0;
        }

        cells[index]++;
        value--;
    }
}

console.log(`Part 1: ${states.length}`); // 3156
console.log(`Part 2: ${states.length - _.indexOf(states, cells.toString())}`); // 1610