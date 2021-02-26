const mount = require('mount');
require('prototype.tower');
require('prototype.spawn');
// var roleHarvester = require('role.harvester');
// var roleUpgrader = require('role.upgrader');
// var roleBuilder = require('role.builder');
// var roleRepairer = require('role.repairer');
// var roleCarrier = require('role.carrier');
// var roleLongDistanceHarvester = require('role.longDistanceHarvester');
// var roleClaimer = require('role.claimer');


module.exports.loop = function () {
    //mount
    mount();

    //clear memory
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    //creeps' actions
    for (let name in Game.creeps) {
        Game.creeps[name]._runRole();
        Game.creeps[name]._longDistanceRunRole();
    }
    //spawns' actions
    for (let spawnName in Game.spawns) {
        // run spawn logic
        Game.spawns[spawnName]._spawnCreeps();
        Game.spawns[spawnName]._countRoles();
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

} 