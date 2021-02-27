//const roleHarvester = require("./role.harvester");

var roleUpgrader = {
    run: function (creep) {
        creep._checkWorkingState();

        if (creep.memory.working == false) {
            //get energy from the energy-stored-structure
            if (!creep._withdrawEnergyFromStorage()) {

                creep._harvestEnergy();

            }
        }
        else {
            controller = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTROLLER)
            })
            //bring energy to the controller and upgrade it
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
            else {
                //creep.say(creep.upgradeController(creep.room.controller));
            }
        }
    },

    longDistanceRun: function (creep, targetRoom) {
        if (!creep._goToAnotherRoom(targetRoom)) {
            creep.run(creep);
        }

    }

}

module.exports = roleUpgrader;