
StructureSpawn.prototype.spawnCustomCreep =
    function (energy, roleName, longDistance = false) {
        var body = [];
        if (roleName == 'carrier') {
            var numOfParts = Math.floor(energy / 100);
            for (let i = 0; i < numOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numOfParts; i++) {
                body.push(MOVE);
            }
        }
        else {
            var numOfParts = Math.floor(energy / 200);
            for (let i = 0; i < numOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numOfParts; i++) {
                body.push(MOVE);
            }
        }

        return this.spawnCreep(body, roleName + Game.time,
            { memory: { role: roleName, working: false, longDistance: longDistance } });
    };

StructureSpawn.prototype.clearMemory =
    function () {
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }
    };

Structure.prototype.spawnLongDistanceHarvester =
    function (homeRoom, targetRoom) {
        // 
        var body = [];
        for (let i = 0; i < 1; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < 1; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < 2; i++) {
            body.push(MOVE);
        }
        return this.spawnCreep(body, 'longDistanceHarvester' + Game.time, {
            memory: {
                role: 'longDistanceHarvester',
                homeRoom: homeRoom,
                targetRoom: targetRoom,
                working: false
            }
        });
    }

Structure.prototype.spawnLongDistanceBuilder =
    function (homeRoom, targetRoom) {
        // 
        var body = [];
        for (let i = 0; i < 1; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < 1; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < 2; i++) {
            body.push(MOVE);
        }
        return this.spawnCreep(body, 'longDistanceBuilder' + Game.time, {
            memory: {
                role: 'longDistanceBuilder',
                homeRoom: homeRoom,
                targetRoom: targetRoom,
                working: false
            }
        });
    }
StructureSpawn.prototype.spawnClaimer =
    function (targetRoom) {
        return this.spawnCreep([CLAIM, MOVE], 'claimer' + Game.time,
            { memory: { role: 'claimer', targetRoom: targetRoom } });

    }