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
            //get energy from the container
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                        && s.store[RESOURCE_ENERGY] != 0)
                });
            if (structure != undefined) {
                if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
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