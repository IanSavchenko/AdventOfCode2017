let _ = require('lodash');

let hash = (data) => {
    let scramble = (data, rotations = 1) => {
        let list = _.range(0, 256);
        
        let cur = 0;
        let skip = 0;
        
        let rotate = function() {
            _.forEach(data, function(len) {
                let temp = [];
                let i = 0;
                while (i < len) {
                    temp[i] = list[(cur + i) % list.length];
                    i++;
                }
            
                temp.reverse();
                i = 0;
                while (i < len) {
                    list[(cur + i) % list.length] = temp[i];
                    i++;
                } 
            
                cur += (skip + len) % list.length;    
                skip++;
            });
        };
        
        _.times(rotations, rotate);
        return list;
    };

    data = data.slice();
    data.push(17, 31, 73, 47, 23);
    
    let list = scramble(data, 64);
    let dense = _.chain(list)
        .chunk(16)
        .map((part) => part.reduce((acc, val) => acc ^ val))
        .value();
    
    let result = _.reduce(dense, 
        (acc, num) => acc += _.padStart(num.toString(16), 2, '0'), 
        ''
    );

    return result;
};

let input = 'ljoxqyyw';

let matrix = Array(128).fill();

let rows = _.range(0, 128).map((r) => `${input}-${r}`);
let result = _.sum(_.map(rows, (row, ri) => {
    matrix[ri] = [];
    row = row.trim().split('').map(num => num.charCodeAt(0));
    let rowHash = hash(row);
    let hexDigits = rowHash.split('');
    let binaryDigits = hexDigits
        .map(hex => parseInt(hex, 16).toString(2))
        .map(bin => _.padStart(bin, 4, '0'));

    let binaryRow = _.join(binaryDigits,'');

    // needed for part 2
    _.forEach(binaryRow, (val, ci) => matrix[ri][ci] = Number(val) - 1);

    let ones = _.filter(binaryRow, (ch) => ch == '1');
    return ones.length;
}));

console.log(`Part 1: ${result}`); // 8316

// Part 2
let paint = function(x, y, num) {
    if (matrix[x][y] != 0)
        return false;
   
    matrix[x][y] = num;
    if (x > 0)
        paint(x - 1, y, num);
    if (y > 0) 
        paint(x, y - 1, num);
    if (x < matrix.length - 1)
        paint(x + 1, y, num);
    if (y < matrix.length - 1)
        paint(x, y + 1, num);
        
    return true;
};

let regions = 0;
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] == 0) {
            regions++;
            paint(i, j, regions);
        }
    }
}

console.log(`Part 2: ${regions}`); // 1074