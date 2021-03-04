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
            if (!_upgradeController()) {
                creep.say("无控制器！");
            }
        }
    },
}

module.exports = roleUpgrader;