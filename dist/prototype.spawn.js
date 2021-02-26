rolesList = {
    'harvester': 4,
    'carrier': 2,
    'builder': 3,
    'repairer': 1,
    'upgrader': 1,
    'colonyBuilder': 4,
    'colonyUpgrader': 2
}

StructureSpawn.prototype._countRoles =
    function () {
        let room = this.room;
        let creeps = room.find(FIND_MY_CREEPS);
        numOfcreeps = {};
        for (let role in rolesList) {
            numOfcreeps[role] = _.sum(creeps, (c) => c.memory.role == role);
        }

        var message = ''
        for (let role in rolesList) {
            message += role + ': ' + numOfcreeps[role] + '\n';
        }

    };

StructureSpawn.prototype._spawnCreeps =
    function () {
        let room = this.room;
        let creeps = room.find(FIND_MY_CREEPS);
        let maxEnergy = room.energyAvailable;
        numOfcreeps = {};
        for (let role in rolesList) {
            numOfcreeps[role] = _.sum(creeps, (c) => c.memory.role == role);
        }
        let sources = room.find(FIND_SOURCES);
        let ExistContainer = room.find(FIND_STRUCTURES, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        });



        //spawn roles
        for (let role in rolesList) {
            if (role == 'harvester') {
                //spawn harvester
                if (ExistContainer != undefined) {
                    //if there exitsts container, spawn normal container
                    for (let source of sources) {
                        if (!_.some(creeps, c => c.memory.role == 'harvester' && c.memory.sourceId == source.id)) {
                            // check whether or not the source has a harvester
                            let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                                filter: s => s.structureType == STRUCTURE_CONTAINER
                            });
                            // check whether or not the source has a container
                            if (containers.length > 0) {
                                this.spawnHarvester(source.id);
                                break;
                            }
                        }
                    }
                }
                else {
                    //spawn early container
                    if (numOfcreeps[role] < rolesList[role])
                        this.spawnCustomCreep(200, role);
                }
            }
            else if (role == 'carrier') {
                if (ExistContainer != undefined) {
                    this.spawnCustomCreep(maxEnergy, role);
                }
            }
            else if (role == 'colonyBuilder' || role == 'colonyUpgrader') {
                this.spawnCustomCreep(400, role, true);
            }
            else if (numOfcreeps[role] < rolesList[role]) {
                this.spawnCustomCreep(maxEnergy, role)
            }
        }
    };


StructureSpawn.prototype.spawnCustomCreep =
    function (energy, roleName, longDistance = false) {
        var energy = energy < 1000 ? energy : 1000;
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



Structure.prototype.spawnLongDistanceHarvester =
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
    }

Structure.prototype.spawnHarvester =
    function (sourceId) {

        return this.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], 'harvester' + Game.time, {
            memory: {
                role: 'harvester',
                working: false,
                sourceId=sourceId
            }
        });
    }
StructureSpawn.prototype.spawnClaimer =
    function (targetRoom) {
        return this.spawnCreep([CLAIM, MOVE], 'claimer' + Game.time,
            { memory: { role: 'claimer', targetRoom: targetRoom } });

    }
