
var roleCarrier = {
    run: function (creep) {
        creep._checkWorkingState();
        let source = Game.getObjectById(creep.memory.sourceId);
        let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        })[0];
        if (creep.memory.working == false) {
            //find energy from everywhere
            if(!creep._pickupEnergy()){
                if (!creep._withdrawEnergyFromRuin()) {
                    if (container != undefined) {
                        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    } 
                }
                else {
                    creep.say('配对错乱！');
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