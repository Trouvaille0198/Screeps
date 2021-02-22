var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');


module.exports.loop = function () {
    var minNumOfHarvesters = 10;
    var minNumOfUpgraders = 5;
    var minNumOfBuilders = 5;
    var minNumOfRepairers = 5;
    var numOfHarvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var numOfUpgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var numOfBuilders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');
    var numOfRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
    //Clear memories
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    // for every creep's loop
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    if (numOfHarvesters < minNumOfHarvesters) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE],
            'harvester' + Game.time,
            { memory: { role: 'harvester', working: false } });
        //console.log('A harevster has been spawned.');
    }
    else if (numOfUpgraders < minNumOfUpgraders) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE],
            'upgrader' + Game.time,
            { memory: { role: 'upgrader', working: false } });
        //console.log('An upgrader has been spawned.');
    }
    else if (numOfRepairers < minNumOfRepairers) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE],
            'repairer' + Game.time,
            { memory: { role: 'repairer', working: false } });
        //console.log('An repairer has been spawned.');
    }
    else if (numOfBuilders < minNumOfBuilders) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE],
            'builder' + Game.time,
            { memory: { role: 'builder', working: false } });
        //console.log('An builder has been spawned.');
    }


    console.log(numOfHarvesters, numOfUpgraders, numOfBuilders, numOfRepairers);
} 