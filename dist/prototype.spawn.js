
StructureSpawn.prototype.spawnCustomCreep =
    function (energy, roleName) {
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

        return this.spawnCreep(body, roleName + Game.time, { memory: { role: roleName, working: false } });
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

