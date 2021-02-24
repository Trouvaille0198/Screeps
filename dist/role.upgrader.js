var roleUpgrader = {
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
                    filter: (s) => ((s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_TOWER)
                        && s.store[RESOURCE_ENERGY] > 0)
                });
            if (structure != undefined) {
                if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                creep.say('energy empty!');
            }
        }
        else {
            //bring energy to the controller and upgrade it
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }

}

module.exports = roleUpgrader;