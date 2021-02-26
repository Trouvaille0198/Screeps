//var roleCarrier = require('./role.carrier');

var roleClaimer = {
    run: function (creep) {
        // if in target room
        if (creep.room.name != creep.memory.targetRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
            // creep.moveTo(32, 18);
            // creep.say('开始寻找');
            // // claim! 
            // var controller = creep.pos.findClosestByPath(FIND_STRUCTURES,
            //     { filter: (c) => (c.structreType == STRUCTURE_CONTROLLER) });
            // if (controller != undefined) {
            //     creep.say('找到咯！');
            //     if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(controller);
            //     }
            // }
            // else {
            //     creep.say('没找着');
            // }
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.room.controller);
            }
        }

    }
}

module.exports = roleClaimer;