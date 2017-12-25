let fs = require('fs');
let _ = require('lodash');

let data = fs.readFileSync('input.txt', 'utf8');
let towers = data.split('\n').map(function(towerLine) {
    let props = towerLine.trim().split(' ');
    let tower = {
        name: props[0],
        weight: parseInt(_.trim(props[1], '()')),
        children: _.drop(props, 3).map(child => _.trim(child, ','))
    };

    return tower;
});


// Part 1
let bottom;
for (let i = 0; i < towers.length; i++) {
    let isChild = false;
    for (let j = 0; j < towers.length; j++) {
        if (_.includes(towers[j].children, towers[i].name)) {
            isChild = true;
        }
    }

    if (!isChild) {
        bottom = towers[i];
    }
}

console.log(`Part 1: ${bottom.name}`); // vvsvez


// Part 2
_.forEach(towers, function(tower) {
    tower.children = _.map(tower.children, name => _.find(towers, {name}));
});

let getWeight = function(tower) {
    if (!tower.totalWeight) {
        tower.totalWeight = tower.weight + _.sum(tower.children.map(t => getWeight(t)));
    }
    
    return tower.totalWeight;
};

let allUnbalanced = [];
_.forEach(towers, function(tower) {
    let {children} = tower;

    children.forEach(child => getWeight(child));
    let weightGroups = _.groupBy(children, 'totalWeight');
    if (_.keys(weightGroups).length <= 1) {
        return;
    }

    weightGroups = _.values(weightGroups);
    let unbalancedTower = _.first(_.find(weightGroups, group => group.length == 1));
    let expectedWeight = _.first(_.find(weightGroups, group => group.length > 1)).totalWeight;

    unbalancedTower.error = unbalancedTower.totalWeight - expectedWeight;
    allUnbalanced.push(unbalancedTower);
});

let unbalanced = _.minBy(allUnbalanced, 'totalWeight');
console.log(`Part 2: ${unbalanced.weight - unbalanced.error}`); // 362