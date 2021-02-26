var roleRepairer = require('./role.repairer');

var roleBuilder = {
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
            // complete a constructionSite
            if (!creep._build()) {
                // if no constructions needed to be built, go upgrading the controller
                roleRepairer.run(creep);
            }
        }
    },

    longDistanceRun: function (creep, targetRoom) {
        if (!creep._goToAnotherRoom(targetRoom)) {
            this.run(creep);
        }

    }
}

module.exports = roleBuilder;