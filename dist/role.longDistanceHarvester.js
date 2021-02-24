//var roleCarrier = require('./role.carrier');

var roleLongDistanceHarvester = {
    run: function (creep) {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false) {
            //go to the other room to harvest
            if (creep.room.name != creep.memory.targetRoom) {
                //if not in the target room
                var exit = creep.room.findExitTo(creep.memory.targetRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
            else {
                //var source = Game.rooms[creep.memory.targetRoom].find(FIND_SOURCES_ACTIVE); //didn't work
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                //creep.moveTo(10, 20);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
        else {
            creep.say('111');
            if (creep.room.name != creep.memory.homeRoom) {
                //if not in the target room
                var exit = creep.room.findExitTo(creep.memory.homeRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
            else {
                //go back
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {
                        filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                            && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY))
                    });
                if (structure != undefined) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
            }
        }

    }
}

module.exports = roleLongDistanceHarvester;