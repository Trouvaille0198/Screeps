// var roleBuilder = require("./role.builder");
var roleUpgrader = require('role.upgrader');

var roleRepairer = {
    run: function (creep) {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false) {
            //get energy from the energy-stored-structure
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => ((s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_STORAGE)
                        && s.store[RESOURCE_ENERGY] > 0)
                });
            if (structure != undefined) {
                if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                creep.say('能源空!');
            }
        }
        else {
            //begin repairing
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                {
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                        && s.structureType != STRUCTURE_RAMPART
                });
            var wall = creep.pos.findClosestByPath(FIND_STRUCTURES,
                {
                    filter: (s) => (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
                        && s.hits < 5000
                });
            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else if (wall != undefined) {
                if (creep.repair(wall) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(wall);
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
    }
}

module.exports = roleRepairer;