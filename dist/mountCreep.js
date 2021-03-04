// 将拓展签入 Creep 原型
module.exports = function () {
    _.assign(Creep.prototype, creepExtension);
}

const creepExtension = {
    _checkWorkingState() {
        //check working state ang switch it if necessary
        if (this.store[RESOURCE_ENERGY] == 0) {
            //if has no energy, stop working and go to get energy
            this.memory.working = false;
        }
        else if (this.store[RESOURCE_ENERGY] == this.store.getCapacity(RESOURCE_ENERGY)) {
            //if carried energy full, go working
            this.memory.working = true;
        }
    },

    _harvestEnergy() {
        //harvest energy from the source
        var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (source != undefined) {
            if (this.harvest(source) == ERR_NOT_IN_RANGE) {
                this.moveTo(source);
                return true;
            }
        }
        else {
            this.say('莫得东西采');
            return false;
        }
    },

    _transferEnergyToContainer() {
        //bring energy to the container
        var structure = this.pos.findClosestByPath(FIND_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                    && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY))
            });
        if (structure != undefined) {
            if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
                return true;
            }
        }
        else {
            return false;
        }
    },

    _pickupEnergy() {
        //pick up dropped energy
        var dropEnergy = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES,
            {
                filter: (s) => s.resourceType == RESOURCE_ENERGY
            });
        if (dropEnergy != undefined) {

            this.say('捡垃圾咯')
            if (this.pickup(dropEnergy) == ERR_NOT_IN_RANGE) {
                this.moveTo(dropEnergy);
                return true;
            }
        }
        else {
            return false;
        }
    },

    _withdrawEnergyFromRuin() {
        //withdraw energy from ruin
        var ruin = this.pos.findClosestByPath(FIND_RUINS);
        if (ruin != undefined) {
            //pick up drop energy
            if (this.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(ruin);
                return true;
            }
        }
        else {
            return false;
        }
    },

    _withdrawEnergyFromContainer() {
        //get energy from the container 
        var structure = this.pos.findClosestByPath(FIND_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                    && s.store[RESOURCE_ENERGY] != 0)
            });
        if (structure != undefined) {
            if (this.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
                return true;
            }
        }
        else {
            this.say('无物可搬');
            return false;
        }
    },

    _transferEnergyToSpawn() {
        //carry energy to spawn
        var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY))
            });
        if (structure != undefined) {
            if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
                return true;
            }
        }
        else {
            return false;
        }

    },

    _transferEnergyToExtension() {
        //carry energy to extention
        var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_EXTENSION
                    && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY))
            });
        if (structure != undefined) {
            if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
                return true;
            }
        }
        else {
            return false;
        }

    },

    _transferEnergyToTower() {
        //carry energy to tower
        var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_TOWER
                    && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY))
            });
        if (structure != undefined) {
            if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
                return true;
            }
        }
        else {
            return false;
        }

    },

    _transferEnergyToStorage() {
        //carry energy to storage
        var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE
                    && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY))
            });
        if (structure != undefined) {
            if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
                return true;
            }
        }
        else {
            return false;
        }
    },

    _withdrawEnergyFromStorage() {
        var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE
                    && s.store[RESOURCE_ENERGY] > 0)
            });
        if (structure != undefined) {
            if (this.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
                return true;
            }
        }
        else {
            return false;
        }
    },

    _withdrawEnergyFromExtension() {
        var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_EXTENSION
                    && s.store[RESOURCE_ENERGY] > 0)
            });
        if (structure != undefined) {
            if (this.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
                return true;
            }
        }
        else {
            return false;
        }
    },

    _build() {
        // complete a constructionSite
        var constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (constructionSite != undefined) {
            // if there are some construction sites to build
            if (this.build(constructionSite) == ERR_NOT_IN_RANGE) {
                this.moveTo(constructionSite);
                return true;
            }
        }
        else {
            return false;
        }
    },

    _repair() {
        var structure = this.pos.findClosestByPath(FIND_STRUCTURES,
            {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                    && s.structureType != STRUCTURE_RAMPART
            });
        var wall = this.pos.findClosestByPath(FIND_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
                    && s.hits < 7000
            });
        if (structure != undefined) {
            if (this.repair(structure) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
                return true;
            }
        }
        else if (wall != undefined) {
            if (this.repair(wall) == ERR_NOT_IN_RANGE) {
                this.moveTo(wall);
                return true;
            }
        }
        else {
            return false;
        }
    },

    _goToAnotherRoom(targetRoom) {
        if (this.room.name != targetRoom) {
            this.say('爬到另一个房间去了');
            var exit = this.room.findExitTo(targetRoom);
            this.moveTo(this.pos.findClosestByRange(exit));
            return true;
        }
        else {
            return false;
        }
    },

    _findEnergy() {
        //find energy in all ways
        if (!this._withdrawEnergyFromRuin()) {
            if (!this._pickupEnergy()) {
                if (!this._withdrawEnergyFromStorage()) {
                    if (!this._withdrawEnergyFromExtension()) {
                        if (!this._withdrawEnergyFromContainer()) {
                            this._harvestEnergy();
                            return true;
                        }
                    }
                }
            }
        }
    },

    _upgradeController() {
        controller = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTROLLER)
        })
        if (controller != undefined) {
            //bring energy to the controller and upgrade it
            if (this.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                this.moveTo(controller);
                return true;
            }
        }
        else {
            return false;
        }
    }
}