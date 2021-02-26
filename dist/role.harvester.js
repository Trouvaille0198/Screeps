
var roleHarvester = {
    run: function (creep) {

        creep._checkWorkingState();

        if (creep.memory.sourceId != undefined) {
            let source = Game.getObjectById(creep.memory.sourceId);
            let container = source.pos.findInRange(FIND_MY_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            })[0];

            if (!creep.pos.isEqualTo(container.pos)) {
                creep.moveTo(container);
            }
            else {
                if (creep.memory.working == false) {
                    creep.harvest(source);
                }
                else {
                    creep.drop(RESOURCE_ENERGY);
                }

            }
        }

        else {
            // play as a early harvester
            if (creep.memory.working == false) {
                creep._harvestEnergy();
            }
            else {
                if (!creep._transferEnergyToContainer()) {
                    if (!creep._transferEnergyToExtension()) {
                        creep._transferEnergyToSpawn();
                    }
                }
            }
        }
    }
}

module.exports = roleHarvester;