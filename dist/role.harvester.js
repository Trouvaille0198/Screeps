var roleHarvester = {
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            //gathering energy from the source
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
            //bring energy to the spawn
            if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
}

module.exports = roleHarvester;