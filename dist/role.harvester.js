
var roleHarvester = {
    run: function (creep) {
        creep._checkWorkingState();

        if (creep.memory.working == false) {
            creep._harvestEnergy();
        }
        else {
            creep._transferEnergyToContainer();
        }
    }
}

module.exports = roleHarvester;