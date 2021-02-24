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
            //harvest energy from the source
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            //bring energy to the container
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                });
            if (structure != undefined
                && structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY)) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                // if container is filled, go build
                roleBuilder.run(creep);
            }
        }
    }
}

module.exports = roleHarvester;