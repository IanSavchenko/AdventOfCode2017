let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8').trim();
let ports = data.split('\n').map(t => t.split('/').map(i => Number(i.trim())));

let bridges = [];

let addPort = function(bridge, port) {
    let end = bridge.end || 0;
    let str = bridge.str || 0;

    bridge = bridge.slice();
    bridge.push(port);

    bridge.end = port[0] == end ? port[1] : port[0];
    bridge.str = str + port[0] + port[1];

    bridges.push(bridge);
    return bridge;
};

let build = function(bridge) {
    for(let i = 0, len = ports.length; i < len; i++) {
        let port = ports[i];
        if (bridge.end == port[0] || bridge.end == port[1]) {
            if (bridge.includes(port)) // much faster than _.includes!!!!
                continue;
    
            let newBridge = addPort(bridge, port);
            build(newBridge);
        }
    }
};


console.time('Execution time');


ports.forEach(port => {
    if (port[0] == 0 || port[1] == 0) {
        let bridge = addPort([], port);
        build(bridge);
    }
});


let maxByStr = bridges[0];
let maxByLenStr = bridges[0];

for(let i = 0, len = bridges.length; i < len; i++) {
    let b = bridges[i];
    if (b.str > maxByStr.str) 
        maxByStr = b;

    if (b.length > maxByLenStr.length) 
        maxByLenStr = b;
    else if (b.length == maxByLenStr.length && b.str > maxByLenStr.str) 
        maxByLenStr = b;
}

console.log(`Number of bridges: ${bridges.length}`);
console.log(`Part 1: ${maxByStr.str}`); // 1906
console.log(`Part 2: ${maxByLenStr.str}`); // 1824

console.timeEnd('Execution time');