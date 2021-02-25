// var roleUpgrader = require('role.upgrader');
// var roleCarrier = require('./role.carrier');
var roleRepairer = require('./role.repairer');

var roleBuilder = {
    run: function (creep) {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            // if creep is trying to complete a constructionSite but has no energy left
            creep.memory.working = false;// switch state
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            // if creep is harvesting energy but is full
            creep.memory.working = true;// switch state
        }

        if (creep.memory.working == false) {
            //get energy from the energy-stored-structure
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => ((s.structureType == STRUCTURE_STORAGE
                        || s.structureType == STRUCTURE_EXTENSION)
                        && s.store[RESOURCE_ENERGY] > 0)
                });
            if (structure != undefined) {
                if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                creep.say('能源空！');
            }
        }
        else {
            // complete a constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined) {
                // if there are some construction sites to build
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }
            else {
                // if no constructions needed to be built, go upgrading the controller
                roleRepairer.run(creep);
            }
        }
    }
}

module.exports = roleBuilder;