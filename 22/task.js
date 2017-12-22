let fs = require('fs');
let _ = require('lodash');

let readInputMap = function() {
    let data = fs.readFileSync('input.txt', 'utf8').trim();
    return data.split('\n').map(row => {
        row = row.trim();
        return row.split('');
    });    
};

let x, y, dirX, dirY, map;

const initialize2DArray = (w, h, val = null) => Array(h).fill().map(() => Array(w).fill(val));

let getMapX = () => (map.length - 1) / 2 - y;
let getMapY = () => x + (map.length - 1) / 2;

let get = function() {
    let mapX = getMapX();
    let mapY = getMapY();

    // if out of bounds - enlarging twice
    // of course, could just have allocated large enough array from the beginning...
    // but that's not fun
    if (mapX < 0 || mapX >= map.length ||
        mapY < 0 || mapY >= map.length) {
        let sideDiff = (map.length + 1) / 2;
        
        let oldSize = map.length;
        let newSize = oldSize + sideDiff * 2;

        let newAbove = initialize2DArray(newSize, sideDiff, '.');
        map.splice(0, 0, ...newAbove);
        let newBelow = initialize2DArray(newSize, sideDiff, '.');
        map.splice(map.length, 0, ...newBelow);

        _.filter(map, row => row.length < map.length).forEach(row => {
            let newLeft = Array(sideDiff).fill('.');
            row.splice(0, 0, ...newLeft);
            let newRight = Array(sideDiff).fill('.');
            row.splice(row.length, 0, ...newRight);
        });        

        // recalculate coords
        mapX = getMapX();
        mapY = getMapY();
    }

    return map[mapX][mapY];
};

let set = function(val) {
    let mapX = getMapX();
    let mapY = getMapY();

    map[mapX][mapY] = val;
};

let turnLeft = function() {
    if (dirX == 0) {
        dirX = -dirY;
        dirY = 0;
    } else {
        dirY = dirX;
        dirX = 0;
    }
};

let turnRight = function() {
    if (dirX == 0) {
        dirX = dirY;
        dirY = 0;
    } else {
        dirY = -dirX;
        dirX = 0;
    }
};

let reverse = function() {
    dirX = -dirX;
    dirY = -dirY;
};

// Part 1
{
    map = readInputMap();
    x = 0; 
    y = 0;

    dirX = 0;
    dirY = 1;
    
    let step = 0;
    let infections = 0;
    while (step++ < 10000) {
        let val = get();
        switch (val) {
        case('.'):
            set('#');
            turnLeft();
            infections++;
            break;
        case '#':
            set('.');
            turnRight();
            break;
        }

        x += dirX;
        y += dirY;
    }

    console.log(`Part 1: ${infections}`); // 5411
}

// Part 2
{
    map = readInputMap();
    x = 0; 
    y = 0;

    dirX = 0;
    dirY = 1;
    
    let step = 0;
    let infections = 0;
    while (step++ < 10000000) {
        let val = get();
        switch (val) {
        case('.'):
            set('W');
            turnLeft();
            break;
        case 'W':
            set('#');
            infections++;
            break;
        case '#':
            set('F');
            turnRight();
            break;
        case('F'):
            set('.');
            reverse();
            break;
        }

        x += dirX;
        y += dirY;
    }

    console.log(`Part 2: ${infections}`); // 2511416
}