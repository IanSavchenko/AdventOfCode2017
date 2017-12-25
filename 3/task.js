let _ = require('lodash');

let input = 325489;

// Part 1
{
    let i = 1;
    while (i * i < input) {
        i += 2;
    }
    
    let side = i -= 2;
    let findCoords = function() {    
        let pos = side * side + 1;
    
        // starting to the right of the bottom right corner 
        let x = _.toInteger(side / 2) + 1;
        let y = _.toInteger(side / 2);
        
        if (pos + side < input) {
            pos += side;
            y -= side;
        } else {
            // climbing the right edge
            return {
                x,
                y: y - (input - pos)
            };
        }
    
        if (pos + side + 1 < input) {
            pos += side + 1;
            x -= side + 1;
        } else {
            // going left on the top edge
            return {
                x: x - (input - pos),
                y
            };
        }
    
        if (pos + side + 1 < input) {
            pos += side + 1;
            y += side + 1;
        } else {
            // going down on the left edge
            return {
                x,
                y: y + (input - pos)
            };
        }
    
        // going right on the bottom edge
        return {
            x: x + (input - pos),
            y
        };
    };
    
    let coords = findCoords();
    let result = Math.abs(Math.round(coords.x)) + Math.abs(Math.round(coords.y));
    console.log(`Part 1: ${result}`); // 552
}

// Part 2
{
    let size = 100; // should be enough
    let arr = new Array(size);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(size);
        arr[i].fill(0);
    }
    
    let center = size / 2;
    
    let x = center;
    let y = center;
        
    let calcXY = function() {
        arr[x][y] = arr[x - 1][y - 1] + arr[x][y - 1] + arr[x + 1][y - 1]
            + arr[x - 1][y] + arr[x + 1][y]
            + arr[x - 1][y + 1] + arr[x][y + 1] + arr[x + 1][y + 1];
    
        if (arr[x][y] > input) {
            console.log(`Part 2: ${arr[x][y]}`); // 330785
            process.exit(0);
        }
    };

    let go = function(diff, steps = 1) {
        _.times(steps, () => {
            x += diff.x;
            y += diff.y;

            calcXY();
        });
    };
    
    let up = {
        x: 0,
        y: 1
    };

    let down = {
        x: 0,
        y: -1
    };

    let left = {
        x: -1,
        y: 0
    };

    let right = {
        x: 1,
        y: 0
    };

    arr[x][y] = 1;
    let width = 1;
    let height = 1;

    while (true) {        
        go(right, width++);

        go(up, height++);

        go(left, width++);

        go(down, height++);
    }
}