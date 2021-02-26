var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    carrier: require('role.carrier'),
    longDistanceHarvester: require('role.longDistanceHarvester'),
    claimer: require('role.claimer')
};

Creep.prototype._runRole =
    function () {
        if (creep.memory.longDistance == false) {
            roles[this.memory.role].run(this);
        }
    };

Creep.prototype._longDistanceRunRole =
    function (targetRoom) {
        if (targetRoom != undefined) {
            if (creep.memory.longDistance == true) {
                roles[this.memory.role].longDistanceRun(this, targetRoom);
            }
        }
    };