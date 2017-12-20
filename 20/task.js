let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8').trim();

// particles
let items = data.split('\n').map(row => {
    row = row.trim().split('<');
    let item = {};
    item.p = row[1].split('>')[0].split(',').map(el => Number(el));
    item.v = row[2].split('>')[0].split(',').map(el => Number(el));    
    item.a = row[3].split('>')[0].split(',').map(el => Number(el));

    return item;
});

// Part 1
let slowest = _.sortBy(items, 
    item => _.sum(_.map(item.a, a => Math.abs(a))), 
    item => _.sum(_.map(item.v, a => Math.abs(a)))
)[0];

let result1 = _.indexOf(items, slowest);
console.log(`Part 1: ${result1}`); // 457

// Part 2
let add = (a, b) => {
    _.forEach(a, (el, index) => {
        a[index] = el + b[index]; 
    });
};

let stableIterations = -100;
let result2 = 0;
while (stableIterations < 10) {
    let toRemove = [];
    for(let i = 0; i < items.length - 1; i++) {
        for (let j = i + 1; j < items.length; j++) {
            if (_.isEqual(items[i].p, items[j].p)) {
                toRemove.push(items[i]);
                toRemove.push(items[j]);
            }
        }
    }

    _.pullAll(items, toRemove);

    if (items.length == result2) {
        stableIterations++;
    } else {
        stableIterations = 0;
        result2 = items.length;
    }

    items.forEach(item => {
        add(item.v, item.a);
        add(item.p, item.v);
    });    
}

console.log(`Part 2: ${result2}`); // 448