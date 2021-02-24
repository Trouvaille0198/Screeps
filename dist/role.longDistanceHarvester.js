var roleCarrier = require('./role.carrier');

var roleLongDistanceHarvester = {
    run: function (creep) {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false) {
            source = Game.rooms[creep.memory.targetRoom].find(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            structure = Game.rooms[creep.memory.homeRoom].find(FIND_STRUCTURES,
                {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                        && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY))
                });
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                // if container is filled, go carry
                roleCarrier.run(creep);
            }
        }

    }
}

module.exports = roleLongDistanceHarvester;