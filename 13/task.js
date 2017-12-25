let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('./input.txt', 'utf8').trim();

let layers = [];
_.forEach(data.trim().split('\n'), function(row) {
    row = row.split(':');
    layers[+row[0]] = +row[1];
});

// Part 1
let collisions = 0;
_.forEach(layers, function(depth, pos) {
    if (_.isUndefined(depth)) {
        return;
    }

    let scanner = pos % ((depth - 1) * 2);
    if (scanner == 0) {
        collisions += depth * pos;
    }
});

console.log(`Part 1: ${collisions}`); // 1624

// Part 2 (brute force)
let delay = 0;
let caught;
do {
    delay += 1;
    caught = false;

    _.forEach(layers, function(depth, pos) {
        if (_.isUndefined(depth)) {
            return;
        }

        let scanner = (pos + delay) % ((depth - 1) * 2);
        if (scanner == 0) {
            caught = true;
            return false;
        }
    });
} while (caught);

console.log(`Part 2: ${delay}`); // 3923436
