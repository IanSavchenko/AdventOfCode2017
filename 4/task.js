let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8');
let rows = data.trim().split('\n');

// Part 1
{
    let invalid = 0;
    
    _.forEach(rows, function(row) {
        let words = row.trim().split(' ');

        for(let i = 0; i < words.length - 1; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (words[i] === words[j]) {
                    invalid++;
                    return;
                }
            }
        }
    });

    let result = rows.length - invalid;
    console.log(`Part 1: ${result}`); // 337
}

// Part 2
{
    let invalid = 0;

    _.forEach(rows, function(row) {
        let words = row.trim().split(' ').map((word) => word.split('').sort().join(''));

        for(let i = 0; i < words.length - 1; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (words[i] === words[j]) {
                    invalid++;
                    return;
                }
            }
        }
    });

    let result = rows.length - invalid;
    console.log(`Part 2: ${result}`); // 231
}