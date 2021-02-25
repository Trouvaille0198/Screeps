//var roleCarrier = require('./role.carrier');

var roleLongDistanceBuilder = {
    run: function (creep) {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false) {
            creep.say('回来嫖能量');
            if (creep.room.name != creep.memory.homeRoom) {
                //if not in the target room
                var exit = creep.room.findExitTo(creep.memory.homeRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
            else {
                //go back and get energy from the energy-stored-structure
                let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
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
        }
        else {
            //go to the other room to build
            if (creep.room.name != creep.memory.targetRoom) {
                //if not in the target room
                var exit = creep.room.findExitTo(creep.memory.targetRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
            else {
                creep.moveTo(16, 2);
                // complete a constructionSite
                let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (constructionSite != undefined) {
                    // if there are some construction sites to build
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite);
                    }
                }
                // if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(constructionSite);
                // }
                else {
                    creep.say('干完噜');
                    // if no constructions needed to be built, go repairing
                    //roleRepairer.run(creep);
                }
            }

        }
    }
}

module.exports = roleLongDistanceBuilder;