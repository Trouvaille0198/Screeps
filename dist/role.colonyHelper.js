//colonyHelper 需求
// 1. harvest first: spawn,extenstion 
// 2. build structure sites
// 3. upgrade

var roleColonyHelper = {
    run: function (creep) {
        creep._checkWorkingState();

        if (!creep._goToAnotherRoom()) {
            if (creep.memory.working == false) {
                //harvest
                creep._harvestEnergy();
            
            }
            else {
                //fill in extensions
                if (!creep._transferEnergyToSpawn()) {
                    //fill in spawn 
                    if (!creep._transferEnergyToSpawn()) {
                        // complete a constructionSite
                        if (!creep._build()) {
                            // if no constructions needed to be built, go upgrading the controller
                            creep._upgradeController();
                        }
                    }
                }
            }
        }
    }
}

module.exports = roleColonyHelper;
