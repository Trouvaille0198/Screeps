var mount = require('mount');
require('prototype.creep');
require('prototype.tower');
require('prototype.spawn');


const rolesList1 = {
    harvester: 3,
    carrier: 2,
    builder: 2,
    repairer: 1,
    upgrader: 1,
    pickuper: 0,
    colonyHelper: 0,
    longDistanceHarvester: 0
};
const rolesList2 = {
    harvester: 2,
    carrier: 2,
    builder: 2,
    repairer: 1,
    upgrader: 2,
    pickuper: 0,
    colonyHelper: 0,
    longDistanceHarvester: 0
};


module.exports.loop = function () {
    console.log('\n\n-------------------------------------------------------------------------------------------------------------------------');
    //mount
    mount();
    //clear memory
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }


    //spawns' actions
    // for (let name in Game.spawns) {
    //     // run spawn logic
    //     Game.spawns[name]._spawnCreeps(rolesList1);
    //     Game.spawns[name]._outputInfo(rolesList1);
    // }

    Game.spawns['Spawn1']._spawnCreeps(rolesList1, 'E37S39');
    Game.spawns['Spawn1']._outputInfo(rolesList1);

    Game.spawns['Spawn2']._spawnCreeps(rolesList2, 'E36S38');
    Game.spawns['Spawn2']._outputInfo(rolesList2);

    //creeps' actions
    for (let name in Game.creeps) {
        Game.creeps[name]._runRole();
    }

    //towers' actions 
    for (let roomName in Game.rooms) {
        var towers = Game.rooms[roomName].find(FIND_STRUCTURES,
            {
                filter: (t) => (t.structureType == STRUCTURE_TOWER)
            });
        for (var tower of towers) {
            if (!tower._attack())
                if (!tower._heal())
                    tower._repair();
        }
    }
    console.log('-------------------------------------------------------------------------------------------------------------------------\n');
}