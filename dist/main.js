require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');


module.exports.loop = function () {
    var energy = Game.spawns['Spawn1'].room.energyAvailable;
    console.log(energy * 2 + ' energy left');
    //energy = 200;
    //number of creeps in different jobs
    var minNumOfHarvesters = 5;
    var minNumOfUpgraders = 2;
    var minNumOfRepairers = 1;
    var minNumOfBuilders = 3;
    var numOfHarvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var numOfUpgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var numOfRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var numOfBuilders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');

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
        Game.spawns['Spawn1'].spawnCustomCreep(energy, 'harvester');
        // Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE],
        //     'harvester' + Game.time,
        //     { memory: { role: 'harvester', working: false } });
        //console.log('A harevster has been spawned.');
    }
    else if (numOfUpgraders < minNumOfUpgraders) {
        Game.spawns['Spawn1'].spawnCustomCreep(energy, 'upgrader');
    }
    else if (numOfRepairers < minNumOfRepairers) {
        Game.spawns['Spawn1'].spawnCustomCreep(energy, 'repairer');
    }
    else if (numOfBuilders < minNumOfBuilders) {
        Game.spawns['Spawn1'].spawnCustomCreep(energy, 'builder');
    }


    console.log('Har: ' + numOfHarvesters, 'Upgr: ' + numOfUpgraders,
        'Repair: ' + numOfRepairers, 'Build: ' + numOfBuilders);
} 