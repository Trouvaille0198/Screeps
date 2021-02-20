module.exports.loop = function () {
    var creep = Game.creeps['harvester1'];
    if (creep.memory.working === true && creep.store.energy === 0) {
        creep.memory.working = false;
    }
    else if (creep.memory.working === false && creep.store.energy !== 0) {
        //start working and bring energy to the spawn
        creep.memory.working = true;
        
    }
    if (creep.memory.working === true) {
        if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns['Spawn1']);
        }
    }
    else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }    
    }
}