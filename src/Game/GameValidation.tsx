import newGameTemplate from '../GameTemplate/newGameTemplate.json';
import {Building, building, savedGame} from "../Model/savedGameConsts";
import {Game} from "./Game";

/*
计划中这个file的function应该解决游戏开始的时候的各种文件load和save的部分

load的过程应该validate保存的json中的各种数据，防止被sb玩家恶意篡改

 */

export const GameValidation = () => {
        saveGameValidationProcess(newGameTemplate as savedGame);
        return newGameTemplate;
};

function checkBuildingOccupancy(curBuilding: Building, buildings: building[][]): boolean {
    const x = curBuilding.positionX;
    const y = curBuilding.positionY;
    switch (curBuilding.buildingType) {
        case "government":
        case "warehouse":
            return buildings[y][x+1] === 0 && buildings[y+1][x] === 0 && buildings[y+1][x+1] === 0;
        case "housing":
            return true;
        default:
            throw new Error(`unknown building type ${curBuilding.buildingType}`)
    }
}

function saveGameValidationProcess(game: savedGame){
    let population = [0,0,0,0];
    let resourceCapacity = [0,0,0,0];

    for (let eachLand of game.lands) {
        const buildings = eachLand.buildings;
        // check land size
        if (eachLand.landY !== buildings.length){
            throw new Error(`buildings in ${eachLand.landName} does not match with lanY ${eachLand.landY}`);
        }
        for (const eachRow of buildings) {
            if (eachRow.length !== eachLand.landX) {
                throw new Error(`building the ${buildings.indexOf(eachRow)}th row of ${eachLand.landName}
                does not match with ${eachLand.landX}`)
            }
        }
        // check if building positions are correct
        for (let y = 0; y < eachLand.landY; y++) {
            for (let x = 0; x < eachLand.landX; x++) {
                const curBuilding = buildings[y][x];
                if (curBuilding !== 0 && curBuilding !== 1) {
                    console.log(`check building at (${x},${y}) which is ${curBuilding.buildingType}`);
                    if (!checkBuildingOccupancy(curBuilding, buildings)) {
                        throw new Error(`map has conflict with building of 
                        ${eachLand.landName} at position (${x},${y})`)
                    }
                    if (curBuilding.buildingType === 'housing'){
                        // validate population and resource
                        // housing capacity = 5 * 10^(building level - 1)
                        if (curBuilding.additionalInfo !== 5 * Math.pow(10,curBuilding.buildingLevel -1)) {
                            throw new Error(`housing population capacity does not match at building of ${eachLand.landName} -- (${x},${y})
                            expected: ${5 * Math.pow(10,curBuilding.additionalInfo -1)}, actual: ${curBuilding.additionalInfo}`);
                        }
                        population[curBuilding.buildingLevel -1] += curBuilding.additionalInfo;
                    }
                    // warehouse capacity = 500 * 10 ^ (building level - 1)
                    if (curBuilding.buildingType === "warehouse") {
                        if (curBuilding.additionalInfo !== 500 * Math.pow(10, curBuilding.buildingLevel - 1)) {
                            throw new Error(`warehouse ${eachLand.landName} -- (${x},${y}) capacity does not 
                            expected: ${500 * Math.pow(10, curBuilding.buildingLevel - 1)}, actual: ${curBuilding.additionalInfo}`);
                        }
                        resourceCapacity[curBuilding.buildingLevel - 1] += curBuilding.additionalInfo;
                    }
                }
            }
        }
    }
    // validate population size, for each level, require population = sum of housing capacity
    //这个一般不会出错，但是如果有sb乱改存档，就会crash掉
    if (game.population.level1 !== population[0] || game.population.level2 !== population[1] ||
        game.population.level3 !== population[2] || game.population.level4 !== population[3]) {
        return false;
    }
    console.log(`game File is valid.`);
    // otherwise, the save is valid and return true
    return true;
}
