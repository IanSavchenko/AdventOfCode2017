const data = [];
let pos = 0;

const run = (val, dir, newState) => {
    if (pos == data.length) 
        data.push(val);
    else if (pos < 0) 
        data.splice(++pos, 0, val);
    else 
        data[pos] = val;

    pos += dir;
    state = newState;
};

const zero = () => data[pos] != 1;

const left = -1;
const right = 1;
const A = 'A', B = 'B', C = 'C', D = 'D', E = 'E', F = 'F';

let state = A;
let steps = 12629077;

while (steps-- > 0) {
    switch(state) {
    case A:
        if (zero())
            run(1, right, B);
        else 
            run(0, left, B);
        break;
    case B:
        if (zero())
            run(0, right, C);
        else 
            run(1, left, B);
        break;
    case C:
        if (zero())
            run(1, right, D);
        else 
            run(0, left, A);
        break;
    case 'D':
        if (zero())
            run(1, left, E);
        else 
            run(1, left, F);
        break;
    case E:
        if (zero())
            run(1, left, A);
        else 
            run(0, left, D);
        break;
    case F:
        if (zero())
            run(1, right, A);
        else 
            run(1, left, E);
        break;
    }
}

const result = data.filter(d => d == 1).length;
console.log(`Part 1: ${result}`); // 3745
console.log('Part 2: go click the button');