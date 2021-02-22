var roleBuilder = require("./role.upgrader");

var roleRepairer = {
    run: function (creep) {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false) {
            //gathering energy from the source
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            //begin repairing
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL })
            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
    }
}

module.exports = roleRepairer;