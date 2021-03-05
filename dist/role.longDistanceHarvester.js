//var roleCarrier = require('./role.carrier');

var roleLongDistanceHarvester = {
    run: function (creep) {
        creep._checkWorkingState();

        if (creep.memory.working == false) {
            //harvest
            if (!creep._goToAnotherRoom(creep.memory.targetRoom)) {
                creep._harvestEnergy();
            }
        }
        else {
            if (!creep._goToAnotherRoom(creep.memory.homeRoom)) {
                //carry energy to spawn, extension, tower or storage
                if (!creep._transferEnergyToExtension()) {

                    if (!creep._transferEnergyToTower()) {
                        if (!creep._transferEnergyToStorage()) {
                            //creep.say('全满噜！')
                        }
                    }

                }
            }
        }
    }
}


module.exports = roleLongDistanceHarvester;