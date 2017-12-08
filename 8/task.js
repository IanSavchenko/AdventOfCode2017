let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8');
let cmds = data.split('\n').map(row => {
    let r = row.trim().split(' ');
    //      if (regs['  abc  ']    >     10  ) regs['  xyz  ']               +            =   10  
    return `if (regs['${r[4]}']${r[5]}${r[6]}) regs['${r[0]}']${r[1] == 'inc' ? '+' : '-'}=${r[2]}`
});

let max = 0;
regs = new Proxy({}, {
    get: (obj, name) => name in obj ? obj[name] : 0,
    set: (obj, name, val) => {
        if (val > max) {
            max = val;
        }

        obj[name] = val;
    }
});

// evil HAHAHA!!
_.forEach(cmds, eval);

console.log(`Part 1: ${_.max(_.values(regs))}`); // 7787
console.log(`Part 2: ${max}`); // 8997
