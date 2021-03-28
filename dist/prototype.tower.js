StructureTower.prototype._attack =
    function () {
        // let towers attack if necessary
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            this.attack(target);
            return true;
        }
        else
            return false;
    }
StructureTower.prototype._heal =
    function () {
        var creep = this.pos.findClosestByRange(FIND_MY_CREEPS,
            { filter: (c) => c.hits < c.hitsMax });
        if (creep != undefined) {
            this.heal(creep);
            return true;
        }
        else
            return false;
    }

StructureTower.prototype._repair =
    function () {
        var structure = this.pos.findClosestByRange(FIND_STRUCTURES,
            {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                    && s.structureType != STRUCTURE_RAMPART
            });
        if (structure != undefined) {
            this.repair(structure);
            return true;
        }
        else
            return false;
    }