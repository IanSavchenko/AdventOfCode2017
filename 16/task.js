let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8').trim();
let moves = data.split(',');

let initState = _.range(0, 16).map(d => String.fromCharCode('a'.charCodeAt(0) + d));

// Part 1
let state = initState.slice();
let dance = function() {
    _.forEach(moves, move => {
        switch(move[0]) {
        case 's': {
            let n = +move.substr(1);
            let swap = _.drop(state, state.length - n);
            state = swap.concat(_.take(state, state.length - n));
            break;
        }
        case 'x': {
            let first = +move.substr(1).split('/')[0];
            let second = +move.substr(1).split('/')[1];
            let swap = state[first];
            state[first] = state[second];
            state[second] = swap;
            break;
        }
        case 'p': {
            let first = _.findIndex(state, s => s == move[1]);
            let second = _.findIndex(state, s => s == move[3]);
            let swap = state[first];
            state[first] = state[second];
            state[second] = swap;
            break;
        }}
    });
};

dance();

console.log(`Part 1: ${_.join(state, '')}`); // kgdchlfniambejop

// Part 2
let it = 0;
state = initState.slice();
while (it++ < 1000*1000*1000) {
    dance();

    // shortcut
    if (_.isEqual(state, initState)) {
        it = _.toInteger(1000*1000*1000 / it) * it;
    }
}

console.log(`Part 2: ${_.join(state, '')}`); // fjpmholcibdgeakn