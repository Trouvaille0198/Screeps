require('prototype.tower');
require('prototype.spawn');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCarrier = require('role.carrier');


module.exports.loop = function () {
    var wholeEnergy = Game.spawns['Spawn1'].room.energyAvailable;
    var energy = wholeEnergy < 800 ? wholeEnergy : 800;
    console.log(wholeEnergy + ' energy left');
    //energy = 200;
    //number of creeps in different jobs
    var minNumOfHarvesters = 6;
    var minNumOfCarriers = 3;
    var minNumOfUpgraders = 2;
    var minNumOfRepairers = 2;
    var minNumOfBuilders = 4;
    var numOfHarvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var numOfCarriers = _.sum(Game.creeps, (creep) => creep.memory.role == 'carrier');
    var numOfUpgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var numOfRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var numOfBuilders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');

    //Clear memories
    Game.spawns['Spawn1'].clearMemory();
    // for every creep's loop
    //var creepJobs = ['harvester', 'carrier', 'upgrader', 'builder', 'repairer']
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
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
    }
    else if (numOfCarriers < minNumOfCarriers) {
        Game.spawns['Spawn1'].spawnCustomCreep(energy, 'carrier');
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

    var towers = Game.rooms['E37S37'].find(FIND_STRUCTURES,
        {
            filter: (t) => (t.structureType == STRUCTURE_TOWER)
        });
    for (var tower of towers) {
        tower._attack();
        tower._heal();
        tower._repair();
    }

    console.log('Har: ' + numOfHarvesters, 'Car: ' + numOfCarriers, 'Upgr: ' + numOfUpgraders,
        'Repair: ' + numOfRepairers, 'Build: ' + numOfBuilders);
} 