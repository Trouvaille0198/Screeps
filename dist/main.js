var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
// var cons = require('constants');





module.exports.loop = function () {
    var minNumOfHarvesters = 10;
    var minNumOfUpgraders = 10;
    var numOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    //Clear memories
    for (let name in Memory.creeps)
    {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
     
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
    }

    if (numOfHarvesters < minNumOfHarvesters) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE,MOVE],
            'harvester' + Game.time,
            { memory: { role: 'harvester',working:false } });
        //console.log('A harevster has been spawned.');
    }
    else if (numOfUpgraders < minNumOfUpgraders) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE,MOVE],
            'upgrader' + Game.time,
            { memory: { role: 'upgrader',working:false } });
        //console.log('An upgrader has been spawned.');
    }
    console.log(numOfHarvesters, numOfUpgraders);
}