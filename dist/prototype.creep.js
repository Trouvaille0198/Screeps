var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    carrier: require('role.carrier'),
    longDistanceHarvester: require('role.longDistanceHarvester'),
    claimer: require('role.claimer'),
    pickuper:require('role.pickuper')
};

Creep.prototype._runRole =
    function () {
        if (this.memory.longDistance != true) {
            roles[this.memory.role].run(this);
        }
    };

Creep.prototype._longDistanceRunRole =
    function (targetRoom) {
        if (targetRoom != undefined) {
            roles[this.memory.role].longDistanceRun(this, targetRoom);
        }
    };
    