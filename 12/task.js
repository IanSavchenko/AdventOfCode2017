let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('./input.txt', 'utf8').trim();
let rows = data.split('\n');

let matrix = Array(rows.length).fill().map(_row => []);
for (let row of rows) {
    let nums = row.trim().split(' ');

    let rowNum = Number(nums[0]);
    _.chain(nums).drop(2).map(num => _.trim(num, ',')).map(Number).value().forEach(function(colNum)
    {
        matrix[rowNum][colNum] = 1;
        matrix[colNum][rowNum] = 1;
    });
}

let connect = function(row, group) {
    _.forEach(row, function(connected, peer){
        if (!connected) {
            return;
        }

        if (group.has(peer)) {
            return;
        }

        group.add(peer);
        connect(matrix[peer], group);
    });
};

let groups = [];
for (let i = 0; i < matrix.length; i++) {
    if (_.some(groups, group => group.has(i))) {
        continue;
    }    

    let group = new Set();
    connect(matrix[i], group);
    groups.push(group);
}

console.log(`Part 1: ${groups[0].size}`); // 134
console.log(`Part 2: ${groups.length}`); // 193