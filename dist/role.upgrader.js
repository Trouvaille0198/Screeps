//const roleHarvester = require("./role.harvester");

var roleUpgrader = {
    run: function (creep) {
        creep._checkWorkingState();

        if (creep.memory.working == false) {
            //get energy from the energy-stored-structure
            if (!creep._withdrawEnergyFromStorage()) {
                if (!creep._withdrawEnergyFromExtension()) {
                    creep.say('自己挖');
                    creep._harvestEnergy();
                }
            }
        }
        else {
            //bring energy to the controller and upgrade it
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },

    longDistanceRun: function (creep, targetRoom) {
        if (!creep._goToAnotherRoom(targetRoom)) {
            this.run(creep);
        }

    }

}

module.exports = roleUpgrader;