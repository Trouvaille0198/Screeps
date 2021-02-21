var roleHarverster = require('role.harvester');
var roleUpgrader = require('role.upgrader');
// var cons = require('constants');

var minNumOfHarvesters = 5;
var numOfHarvesters = _.sum(Game.screeps, (c) => c.memory.role == 'harvester');
var minNumOfUpgraders = 5;
var numOfUpgraders = _.sum(Game.screeps, (c) => c.memory.role == 'upgrader');


module.exports.loop = function () {
    //Clear memories
    for (let name in Memory.creeps)
    {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarverster.run(creep);
        }
        else if (creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
    }

    if (numOfHarvesters < minNumOfHarvesters) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE],
            'harvester'+Game.time,
            { memory: { role: 'harvester' } });
        //console.log('A harevster has been spawned.');
    }
    if (numOfUpgraders < minNumOfUpgraders) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE],
            'upgrader'+Game.time,
            { memory: { role: 'upgrader' } });
        //console.log('An upgrader has been spawned.');
    }
    console.log(numOfHarvesters, numOfUpgraders);
}