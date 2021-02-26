
var roleCarrier = {
    run: function (creep) {
        creep._checkWorkingState();

        if (creep.memory.working == false) {
            //find energy from everywhere
            if (!creep._withdrawEnergyFromRuin()) {
                if (!creep._pickupEnergy()) {
                    creep._withdrawEnergyFromContainer();
                }
            }
        }
        else {
            //carry energy to spawn, extension, tower or storage
            if (!creep._transferEnergyToExtension()) {
                if (!creep._transferEnergyToSpawn()) {
                    if (!creep._transferEnergyToTower()) {
                        if (!creep._transferEnergyToStorage()) {
                            creep.say('全满噜！')
                        }
                    }
                }
            }
        }
    }
}

module.exports = roleCarrier;