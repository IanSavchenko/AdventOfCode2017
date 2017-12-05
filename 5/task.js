let fs = require('fs');
let _ = require('lodash');

let readInput = function() {
    let data = fs.readFileSync('input.txt', 'utf8');
    let jumps = data.trim().split('\n').map((num) => Number(num));
    return jumps;
}

// Part 1
{
    let jumps = readInput();

    let steps = 0;
    let next = 0;

    do 
    {
        steps++;

        let offset = jumps[next];
        jumps[next]++;

        next += offset;
    } while (next < jumps.length && next >= 0)

    console.log(`Part 1: ${steps}`); // 351282
}

// Part 2
{
    let jumps = readInput();

    let steps = 0;
    let next = 0;

    do 
    {
        steps++;
        
        let offset = jumps[next];
        if (offset >= 3) {
            jumps[next]--;
        } else {
            jumps[next]++;
        }

        next += offset;
    } while (next < jumps.length && next >= 0)

    console.log(`Part 2: ${steps}`); // 24568703
}