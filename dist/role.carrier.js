var roleUpgrader = require("./role.upgrader");
var roleBuilder = require("./role.builder");

var roleHarvester = {
    run: function (creep) {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false) {
            //get energy from the container 
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                        && structure.store[RESOURCE_ENERGY] != 0)
                });
            if (structure != undefined)
                if (creep.withdraw(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
        }
        else {
            //carry energy to the spawn, extention and tower
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_TOWER)
                });
            if (structure != undefined
                && structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY)) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
        }
    }
}

module.exports = roleHarvester;