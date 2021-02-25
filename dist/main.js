require('prototype.tower');
require('prototype.spawn');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCarrier = require('role.carrier');
var roleLongDistanceHarvester = require('role.longDistanceHarvester');
var roleLongDistanceBuilder = require('role.longDistanceBuilder');
var roleClaimer = require('role.claimer');


module.exports.loop = function () {
    //console.log(Game.rooms['E37S38'].name);
    var wholeEnergy = Game.spawns['Spawn1'].room.energyAvailable;
    var energy = wholeEnergy < 1000 ? wholeEnergy : 1000;
    console.log(wholeEnergy + ' energy left');
    //energy = 200;
    //number of creeps in different jobs
    var minNumOfHarvesters = 4;
    var minNumOfCarriers = 2;
    var minNumOfUpgraders = 2;
    var minNumOfRepairers = 1;
    var minNumOfBuilders = 2;
    var minNumOfLongDistanceHarvesters = 4;
    //var minNumOfLongDistanceBuilders = 4;
    var numOfHarvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var numOfCarriers = _.sum(Game.creeps, (creep) => creep.memory.role == 'carrier');
    var numOfUpgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var numOfRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var numOfBuilders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');
    var numOfLongDistanceHarvesters = _.sum(Game.creeps,
        (creep) => creep.memory.role == 'longDistanceHarvester');
    // var numOfLongDistanceBuilders = _.sum(Game.creeps,
    //     (creep) => creep.memory.role == 'longDistanceBuilder');


    //Clear memories
    Game.spawns['Spawn1'].clearMemory();
    // for every creep's loop
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
        else if (creep.memory.role == 'longDistanceHarvester') {
            roleLongDistanceHarvester.run(creep);
        }
        else if (creep.memory.role == 'longDistanceBuilder') {
            roleLongDistanceBuilder.run(creep);
        }
        // else if (creep.memory.role == 'claimer') {
        //     roleClaimer.run(creep);
        // }

        // else if (Game.spawns['Spawn1'].memory.claimRoom != undefined) {
        //     if (Game.spawns['Spawn1'].spawnClaimer(Game.spawns['Spawn1'].memory.claimRoom) == OK) {
        //         delete Game.spawns['Spawn1'].memory.claimRoom;
        //         console.log("delete claimRoom memory successfully!");
        //     }
        //     else {
        //         console.log('spawn claimer failed!');
        //     }
        // }
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
    else if (numOfLongDistanceHarvesters < minNumOfLongDistanceHarvesters) {
        Game.spawns['Spawn1'].spawnLongDistanceHarvester('E37S37', 'E37S38');
    }
    // else if (numOfLongDistanceBuilders < minNumOfLongDistanceBuilders) {
    //     Game.spawns['Spawn1'].spawnLongDistanceBuilder('E37S37', 'E37S38');
    // }

    //towers' actions
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
        'Repair: ' + numOfRepairers, 'Build: ' + numOfBuilders,
        'LongDi: ' + numOfLongDistanceHarvesters);
} 