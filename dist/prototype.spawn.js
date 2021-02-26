StructureSpawn.prototype.spawnCustomCreep =
    function (maxEnergy, roleName, longDistance = false) {
        var energy = maxEnergy < 1000 ? maxEnergy : 1000;
        var body = [];
        if (roleName == 'carrier') {
            var energy = maxEnergy < 800 ? maxEnergy : 800;
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



StructureSpawn.prototype.spawnLongDistanceHarvester =
    function (homeRoom, targetRoom) {
        if (targetRoom != undefiend) {
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
    };

StructureSpawn.prototype.spawnHarvester =
    function (maxEnergy, sourceId) {
        if (maxEnergy <= 300) {
            body = [WORK, WORK, MOVE];
        }
        else {
            body = [WORK, WORK, WORK, WORK, WORK, MOVE];
        }
        return this.spawnCreep(body, 'harvester' + Game.time, {
            memory: {
                role: 'harvester',
                working: false,
                sourceId: sourceId
            }
        });
    };

StructureSpawn.prototype.spawnClaimer =
    function (targetRoom) {
        return this.spawnCreep([CLAIM, MOVE], 'claimer' + Game.time,
            { memory: { role: 'claimer', targetRoom: targetRoom } });

    };


StructureSpawn.prototype._outputInfo =
    function (rolesList) {
        let room = this.room;
        let creeps = room.find(FIND_MY_CREEPS);
        let numOfcreeps = {};
        for (let role in rolesList) {
            numOfcreeps[role] = _.sum(creeps, (c) => c.memory.role == role);
        }

        var message = room.name + '---';
        for (let role in rolesList) {
            message += role + ': ' + numOfcreeps[role] + ', ';
        }
        console.log(message);
        console.log(room.energyAvailable + ' energy left');

    };

StructureSpawn.prototype._spawnCreeps =
    function (rolesList) {
        var flag = 0;
        let room = this.room;
        let creeps = room.find(FIND_MY_CREEPS);
        let maxEnergy = room.energyAvailable;
        let numOfcreeps = {};
        for (let role in rolesList) {
            numOfcreeps[role] = _.sum(creeps, (c) => c.memory.role == role);
        }
        let sources = room.find(FIND_SOURCES);
        let ExistContainer = room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        });

        //spawn harvester
        if (ExistContainer.length > 0) {
            flag = 1;
            //if there exitsts container, spawn normal container
            for (let source of sources) {
                if (!_.some(creeps, (c) => c.room = room
                    && c.memory.role == 'harvester' && c.memory.sourceId == source.id)) {
                    // check whether or not the source has a harvester
                    let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER
                    });
                    //console.log(containers.length + '!');
                    // check whether or not the source has a container
                    if (containers.length > 0) {
                        //console.log(source.id);
                        this.spawnHarvester(maxEnergy, source.id);
                        break;
                    }
                }
            }
        }


        if (numOfcreeps['harvester'] < rolesList['harvester'] && flag == 0) {
            console.log('spawning');
            if (this.spawnCustomCreep(maxEnergy, 'harvester') === 0) {
                console.log('spawn a harvester!');
            }
        }
        //spawn carrier
        else if (ExistContainer.length > 0 && numOfcreeps['carrier'] < rolesList['carrier']) {
            this.spawnCustomCreep(maxEnergy, 'carrier');
        }
        else if (numOfcreeps['builder'] < rolesList['builder']) {
            this.spawnCustomCreep(maxEnergy, 'builder');
        }
        else if (numOfcreeps['repairer'] < rolesList['repairer']) {
            this.spawnCustomCreep(maxEnergy, 'repairer');
        }
        else if (numOfcreeps['upgrader'] < rolesList['upgrader']) {
            this.spawnCustomCreep(maxEnergy, 'upgrader');
        }
        else if (numOfcreeps['colonyBuilder'] < rolesList['colonyBuilder']) {
            this.spawnCustomCreep(400, 'builder', true);
        }
        else if (numOfcreeps['colonyUpgrader'] < rolesList['colonyUpgrader']) {
            this.spawnCustomCreep(400, 'upgrader', true);
        }
    };


