let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8');
let matrix = data.split('\r\n');
_.forEach(matrix, (row, i) => matrix[i] = row.split(''));

let get = (x, y) => {
    if (x < 0 || x >= matrix.length) 
        return undefined;
    
    if (y < 0 || y >= matrix.length)
        return undefined;

    return matrix[y][x];
};

let cur = {
    x: _.findIndex(matrix[0], (el) => el != ' '), 
    y: 0
};

let dir = {
    x: 0, 
    y: 1
};

let steps = 0;
let path = '';

let end = false;
while (!end) {
    let symbol = get(cur.x, cur.y);
    switch (symbol) {
    case '|':
    case '-':
        break;
        
    case '+':
        if (dir.y) {
            dir.y = 0;
            let right = get(cur.x + 1, cur.y);
            dir.x = right && right != ' ' ? 1 : -1;
        } else {
            dir.x = 0;
            let down = get(cur.x, cur.y + 1);
            dir.y = down && down != ' ' ? 1 : -1;
        }
        break;

    case ' ':
        end = true;
        break;

    default:
        path = path.concat(symbol);
        break;
    }
    
    if (!end) {
        cur.x += dir.x;
        cur.y += dir.y;
        steps++;
    }
}

console.log(`Part 1: ${path}`); // RUEDAHWKSM
console.log(`Part 2: ${steps}`); // 17264