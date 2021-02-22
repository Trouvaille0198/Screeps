var roleUpgrader = require('role.upgrader');

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
            //gathering energy from the source
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
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
                roleUpgrader.run(creep);
            }
        }
    }
}

module.exports = roleBuilder;