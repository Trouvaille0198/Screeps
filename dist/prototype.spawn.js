module.exports = function () {
    StructureSpawn.prototype.spawnCustomCreep =
        function (energy, roleName) {
            var numOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numOfParts; i++) {
                body.push(MOVE);
            }
            return this.spawnCreep(body, roleName + Game.time, { memory: { role: roleName, working: false } });
        };
};