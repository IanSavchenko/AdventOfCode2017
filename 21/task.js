let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8').trim();

let rules = data.split('\n').map((row) => {
    row = row.trim();
    let parts = row.split(' ');
    return {
        i: parts[0].split('/'),
        o: parts[2].split('/')
    };
});

let picture = ['.#.', '..#', '###'];

// Just to mess around, but on critical paths usual 'for' loops used, since they are much faster
const initialize2DArray = (size) => Array(size).fill().map(() => Array(size).fill(null));

// Just to mess around, but on critical paths usual 'for' loops used, since they are much faster
const foreEach2D = (array, callback) => {
    let stop;
    for(let i = 0; i < array.length; i++) {
        if (stop == false) {
            break;
        }

        for (let j = 0; j < array.length; j++) {
            stop = callback(array[i][j], i, j, array);
            if (stop == false) {
                break;
            }
        }
    }
};

let breakUp = function(size) {
    let output = initialize2DArray(picture.length / size);
    for (let r = 0; r < output.length; r++) {
        for (let c = 0; c < output[r].length; c++) {
            output[r][c] = initialize2DArray(size);
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    output[r][c][i][j] =  picture[r * size + i][c * size + j];
                }
            }
        }
    }

    return output;
};

let joinUp = function(parts, size) {
    let output = initialize2DArray(parts.length * size);
    for (let r = 0; r < parts.length; r++) {
        for (let c = 0; c < parts.length; c++) {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    output[r * size + i][c * size + j] = parts[r][c][i][j]; 
                }
            }
        }
    }

    return output;
};

let rotate = function(part) {
    let output = initialize2DArray(part.length);
    foreEach2D(part, function(val, i, j) {
        output[i][j] = part[part.length - j - 1][i];
    });

    return output;
};

let flipV = function(part) {
    let output = initialize2DArray(part.length);
    foreEach2D(part, function(val, i, j) {
        output[i][j] = part[i][part.length - j - 1];
    });

    return output;
};

let flipH = function(part) {
    let output = initialize2DArray(part.length);
    foreEach2D(part, function(val, i, j) {
        output[i][j] = part[part.length - i - 1][j];
    });

    return output;    
};

let generateRules = function() {
    rules = _.flatten(_.map(rules, rule => {
        let result = [];
        for (let i = 0; i < 4; i++) {
            result.push(rule);
    
            result.push({
                i: flipV(rule.i),
                o: rule.o
            });

            let flippedH = flipH(rule.i);
            result.push({
                i: flippedH,
                o: rule.o
            });
            
            result.push({
                i: flipV(rule.i),
                o: rule.o
            });
    
            result.push({
                i: flipV(flippedH),
                o: rule.o
            });
    
            rule.i = rotate(rule.i);
        }

        return result;
    }));
};

let equals = function(part, pattern) {
    for (let i = 0; i < part.length; i++) {
        for (let j = 0; j < part.length; j++) {
            if (part[i][j] != pattern[i][j]) {
                return false;
            }
        }
    }

    return true;
};

let match = function(part, patterns) {
    let result;
    _.forEach(patterns, pattern => {
        if (equals(part, pattern.i)) {
            result = pattern.o;
            return false;
        }
    });

    return result;
};

let transform = function(size) {
    let parts = breakUp(size);
    let patterns = _.filter(rules, r => r.i.length == size);
    for(let i = 0; i < parts.length; i++) {
        for (let j = 0; j < parts.length; j++) {
            parts[i][j] = match(parts[i][j], patterns);
        }
    }

    picture = joinUp(parts, size + 1);
};

let countPixels = () => _.sumBy(picture, row => _.sumBy(row, cell => cell == '#' ? 1 : 0));

console.time('Execution time');

generateRules();

let it = 0;
while (it++ < 18) {
    transform(picture.length % 2 == 0 ? 2 : 3);

    console.log(it, countPixels());
    if (it == 5) {
        console.log(`Part 1: ${countPixels()}`); // 152
    } 

    if (it == 18) {
        console.log(`Part 2: ${countPixels()}`); // 1956174
    }
}

console.timeEnd('Execution time');