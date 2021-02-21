var roleUpgrader = {
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            //gathering energy from the source
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else if (creep.store.getUsedCapacity()!=0) {
            //bring energy to the controller and upgrade it
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
    
}

module.exports = roleUpgrader;