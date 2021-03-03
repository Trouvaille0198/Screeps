
var rolePickuper = {
    run: function (creep) {
        creep._checkWorkingState();
        
        if (creep.memory.working == false) {
            //find energy from droppped energy
            if(!creep._pickupEnergy()){
                creep.say('没事儿干噜');
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

module.exports = rolePickuper;