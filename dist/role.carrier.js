const { drop } = require("lodash");
var roleUpgrader = require("./role.upgrader");
// var roleBuilder = require("./role.builder");

var roleHarvester = {
    run: function (creep) {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false) {
            var ruin = creep.pos.findClosestByPath(FIND_RUINS);
            var dropEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,
                {
                    filter: (s) => s.resourceType == RESOURCE_ENERGY
                });
            if (ruin != undefined) {
                //pick up drop energy
                if (creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ruin);
                }
            }
            else if (dropEnergy != undefined) {
                //pick up drop energy
                if (creep.pickup(dropEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropEnergy);
                }
            }
            else {
                //get energy from the container 
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {
                        filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                            && s.store[RESOURCE_ENERGY] != 0)
                    });
                if (structure != undefined) {
                    if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
                else {
                    creep.say('无物可搬');
                }
            }
        }
        else {
            //carry energy to the spawn, extention and tower
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => ((s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_TOWER || s.structureType == STRUCTURE_STORAGE)
                        && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY))
                });
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                //roleUpgrader.run(creep);
                creep.say('能源满！');
            }
        }
    }
}

module.exports = roleHarvester;