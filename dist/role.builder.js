var roleRepairer = require('./role.repairer');

var roleBuilder = {
    run: function (creep) {
        creep._checkWorkingState();

        if (creep.memory.working == false) {
            //get energy from the energy-stored-structure
            creep._findEnergy();
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