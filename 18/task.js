let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8').trim();
let cmds = data.split('\n').map(row => {
    return row.trim().split(' ');
});

class Program {
    constructor(id = 0) {
        this.regs = {};

        this.set('p', id);
        this.firstRcv = -1;

        this.cmdOffset = 0;
        this.cmdIndex = 0;
    
        this.sends = 0;
        this.port = [];
    }

    connect(peer) {
        this.peer = peer;
        this.peer.peer = this;
    }

    get(val) {
        return typeof val == 'string' && val.match(/[a-z]/i) 
            ? this.regs[val] || 0
            : +val;
    }

    set(reg, val) {
        this.regs[reg] = this.get(val);
    }

    add(reg, val) {
        this.regs[reg] += this.get(val);
    }

    mul(reg, val) {
        this.regs[reg] *= this.get(val);
    }

    mod(reg, val) {
        this.regs[reg] = this.regs[reg] % this.get(val);
    }

    rcv(reg) {
        if (!this.port.length) {
            this.cmdOffset = 0; // spin wait
            return;
        }

        this.set(reg, this.port.shift());
    }

    jgz(reg, val) {
        val = this.get(val);
        reg = this.get(reg);
        if (reg > 0) {
            this.cmdOffset = val;
        }
    }

    snd(val) {
        this.sends++;
        val = this.get(val);

        this.lastSnd = val;

        if (this.peer) {
            this.peer.port.push(val);
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

    waiting() {
        return this.cmdOffset == 0;
    }

    outOfRange() {
        return this.cmdIndex < 0 || this.cmdIndex >= cmds.length;
    }
}

// Part 1
let p = new Program();
while (true) {
    p.execute();
    
    if (p.outOfRange() || p.waiting()) {
        break;
    }
}

console.log(`Part 1: ${p.lastSnd}`); // 2951

// Part 2
let p0 = new Program(0);
let p1 = new Program(1);

p0.connect(p1);

while (true) {
    p0.execute();
    p1.execute();

    // deadlock
    if (p0.waiting() && p1.waiting()) {
        break;
    }

    if (p0.outOfRange() && p1.outOfRange()) {
        break;
    }
}

console.log(`Part 2: ${p1.sends}`); // 7366