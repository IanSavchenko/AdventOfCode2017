let fs = require('fs');
let _ = require('lodash');

let input = fs.readFileSync('input.txt', 'utf8');

// Part 1
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
    }
    
    _.times(rotations, rotate);
    return list;
}

let data1 = input.trim().split(',').map(num => Number(num));
let result1 = scramble(data1);
console.log(`Part 1: ${result1[0] * result1[1]}`); // 3770

// Part 2
let hash = (data) => {
    data = data.slice(0);
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
 }

let data2 = input.trim().split('').map(num => num.charCodeAt(0));
console.log(`Part 2: ${hash(data2)}`); // a9d0e68649d0174c8756a59ba21d4dc6
 