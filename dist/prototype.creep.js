var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    carrier: require('role.carrier'),
    longDistanceHarvester: require('role.longDistanceHarvester'),
    claimer: require('role.claimer'),
    pickuper: require('role.pickuper'),
    colonyHelper: require('role.colonyHelper')
};

Creep.prototype._runRole =
    function () {
        if (this.memory.role != undefined) {
            roles[this.memory.role].run(this);
        }
    };

