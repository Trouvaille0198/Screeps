StructureSpawn.prototype.spawnCustomCreep =
    function (maxEnergy, roleName) {
        let energy = maxEnergy < 1000 ? maxEnergy : 1000;
        let body = [];

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

        return this.spawnCreep(body, roleName + Game.time,
            { memory: { role: roleName, working: false } });
    };

StructureSpawn.prototype.spawnLongDistanceHarvester =
    function (maxEnergy, roleName) {
        let energy = maxEnergy < 600 ? maxEnergy : 600;
        let body = [];

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

        return this.spawnCreep(body, 'longDistanceHarvester' + Game.time,
            { memory: { role: roleName, working: false } });
    };


StructureSpawn.prototype.spawnHarvester =
    function (maxEnergy, sourceId) {
        let body = [WORK, WORK, MOVE];
        if (maxEnergy < 550) {
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


StructureSpawn.prototype.spawnColonyHelper =
    function (maxEnergy, targetRoom) {
        let body = [];
        var energy = maxEnergy < 800 ? maxEnergy : 800;
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

        return this.spawnCreep(body,
            'colonyHelper to ' + targetRoom + ' ' + Game.time, {
            memory: {
                role: 'colonyHelper',
                working: false,
                targetRoom: targetRoom
            }
        });
    };

StructureSpawn.prototype.spawnCarrier =
    function (maxEnergy, sourceId) {
        let body = [];
        var energy = maxEnergy < 800 ? maxEnergy : 800;
        var numOfParts = Math.floor(energy / 100);

        for (let i = 0; i < numOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numOfParts; i++) {
            body.push(MOVE);
        }

        return this.spawnCreep(body, 'carrier' + Game.time, {
            memory: {
                role: 'carrier',
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
            if (role != 'colonyHelper') {
                message += role + ': ' + numOfcreeps[role] + ', ';
            }
        }
        console.log(message);
        console.log(room.energyAvailable + ' energy left');

    };

StructureSpawn.prototype._spawnCreeps =
    function (rolesList, targetRoom) {
        var flag = 0;
        let room = this.room;
        let creeps = room.find(FIND_MY_CREEPS);
        let maxEnergy = room.energyAvailable;
        let numOfcreeps = {};
        for (let role in rolesList) {
            if (role == 'colonyHelper') {
                // count global number
                numOfcreeps[role] = _.sum(Game.creeps, (c) => c.memory.role == role);
            }
            else {
                // count room number
                numOfcreeps[role] = _.sum(creeps, (c) => c.memory.role == role);
            }
        }
        let sources = room.find(FIND_SOURCES);
        let ExistContainer = room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        });

        //spawn harvester
        if (ExistContainer.length > 0) {
            flag = 1; //skip step 'spawning early harvester'
            if (numOfcreeps['harvester'] < ExistContainer.length) {
                //if there exitsts container, spawn normal harvester
                for (let source of sources) {
                    if (!_.some(creeps, (c) => c.room == room
                        && c.memory.role == 'harvester' && c.memory.sourceId == source.id)) {
                        // check whether or not the source has a harvester
                        let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                            filter: (s) => s.structureType == STRUCTURE_CONTAINER
                        });
                        // check whether or not the source has a container
                        if (containers.length > 0) {
                            let energy = maxEnergy > 300 ? maxEnergy : 300;
                            this.spawnHarvester(energy, source.id);
                            break;
                        }
                    }
                }
            }
        }

        //spawn early harvester
        if (numOfcreeps['harvester'] < rolesList['harvester'] && flag == 0) {
            this.spawnCustomCreep(maxEnergy, 'harvester');
        }
        //spawn carrier
        else if (ExistContainer.length > 0 && numOfcreeps['carrier'] < rolesList['carrier']) {
            for (let source of sources) {
                if (!_.some(creeps, (c) => c.room == room
                    && c.memory.role == 'carrier' && c.memory.sourceId == source.id)) {
                    // check whether or not the source has a carrier
                    let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER
                    });
                    // check whether or not the source has a container
                    if (containers.length > 0) {
                        this.spawnCarrier(maxEnergy, source.id);
                        break;
                    }
                }
            }
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
        else if (numOfcreeps['pickuper'] < rolesList['pickuper']) {
            this.spawnCustomCreep(maxEnergy, 'pickuper');
        }
        else if (numOfcreeps['colonyHelper'] < rolesList['colonyHelper']) {
            this.spawnColonyHelper(400, targetRoom);
        }

    };


