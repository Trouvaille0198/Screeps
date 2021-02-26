// var roleBuilder = require("./role.builder");
var roleUpgrader = require('role.upgrader');

var roleRepairer = {
    run: function (creep) {
        creep._checkWorkingState();

        if (creep.memory.working == false) {
            //get energy from the energy-stored-structure
            if (!creep._withdrawEnergyFromStorage()) {
                if (!creep._withdrawEnergyFromExtension()) {
                    creep.say('莫的能量拿噜');
                }
            }
        }
        else {
            //begin repairing
            if (!creep._repair()) {
                roleUpgrader.run(creep);
            }
        }
    }
}

module.exports = roleRepairer;