let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8').trim();
let cmds = data.split('\n').map(row => {
    return row.trim().split(' ');
});

class Program {
    constructor() {
        this.regs = {};

        this.cmdOffset = 0;
        this.cmdIndex = 0;

        this.muls = 0;
    }

    get(val) {
        return typeof val == 'string' && val.match(/[a-z]/i) 
            ? this.regs[val] || 0
            : +val;
    }

    set(reg, val) {
        this.regs[reg] = this.get(val);
    }

    sub(reg, val) {
        this.regs[reg] -= this.get(val);
    }

    mul(reg, val) {
        this.regs[reg] *= this.get(val);
        this.muls++;
    }

    jnz(reg, val) {
        val = this.get(val);
        reg = this.get(reg);
        if (reg != 0) {
            this.cmdOffset = val;
        }
    }

    execute() {
        this.cmdOffset = 1;
        if (this.outOfRange()) {
            return;
        }

        let cmd = cmds[this.cmdIndex];
        this[cmd[0]](cmd[1], cmd[2]);

        this.cmdIndex += this.cmdOffset;
    }

    outOfRange() {
        return this.cmdIndex < 0 || this.cmdIndex >= cmds.length;
    }
}

// Part 1 (stripped version of 18)
let p = new Program();
while (true) {
    p.execute();
    
    if (p.outOfRange()) {
        break;
    }
}

console.log(`Part 1: ${p.muls}`); // 9409

// Part 2 is disassembling input and optimizing it (see disasm.js)
require('./disasm');