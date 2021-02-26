const mount = require('mount');
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
    //mount
    mount();
    //console.log(Game.rooms['E37S38'].name);
    var wholeEnergy = Game.spawns['Spawn1'].room.energyAvailable;
    var energy = wholeEnergy < 1000 ? wholeEnergy : 1000;
    console.log(wholeEnergy + ' energy left');
    //energy = 200;
    //number of creeps in different jobs
    var minNumOfHarvesters = 4;
    var minNumOfCarriers = 3;
    var minNumOfUpgraders = 2;
    var minNumOfRepairers = 1;
    var minNumOfBuilders = 2;
    var minNumOfLongDistanceHarvesters = 1;
    var minNumOfColonyBuilders = 4;
    var minNumOfColonyUpgraders = 2;

    var numOfHarvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var numOfCarriers = _.sum(Game.creeps, (creep) => creep.memory.role == 'carrier');
    var numOfUpgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var numOfRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var numOfBuilders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');
    var numOfLongDistanceHarvesters = _.sum(Game.creeps,
        (creep) => creep.memory.role == 'longDistanceHarvester');
    var numOfColonyBuilders = _.sum(Game.creeps,
        (creep) => creep.memory.role == 'builder' && creep.memory.longDistance == true);
    var numOfColonyUpgraders = _.sum(Game.creeps,
        (creep) => creep.memory.role == 'upgrader' && creep.memory.longDistance == true);

    //Clear memories
    Game.spawns['Spawn1'].clearMemory();
    //Game.spawns['Spawn2'].clearMemory();
    // for every creep's loop
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.longDistance == true) {
            if (creep.memory.role == 'builder') {
                roleBuilder.longDistanceRun(creep, 'E37S38');
            }
            else if (creep.memory.role == 'upgrader') {
                roleUpgrader.longDistanceRun(creep, 'E37S38');
            }
        }
        else {
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
            // else if (creep.memory.role == 'claimer') {
            //     roleClaimer.run(creep);
            // }
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
    else if (numOfLongDistanceHarvesters < minNumOfLongDistanceHarvesters) {
        Game.spawns['Spawn1'].spawnLongDistanceHarvester('E37S37', 'E37S38');
    }
    else if (numOfColonyUpgraders < minNumOfColonyUpgraders) {
        Game.spawns['Spawn1'].spawnCustomCreep(400, 'upgrader', true);
    }
    else if (numOfColonyBuilders < minNumOfColonyBuilders) {
        Game.spawns['Spawn1'].spawnCustomCreep(400, 'builder', true);
    }


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
    console.log('longBuilder: ' + numOfColonyBuilders, 'longUp: ' + numOfColonyUpgraders);
} 