export type buildingType = "government" | "housing" | "warehouse";
export type buildingLevel = 1 | 2 | 3 | 4
export interface savedGame {
    lands: Land[],
    population: Population,
    resources: Resources,
    army: Armies,
    hallows: Hallow[],
}

export interface Land {
    landName: string,
    // top left corner is (0,0), X-horizon, Y-vertical
    landY: number,
    landX: number,
    buildings: building[][]
}

export type building = Building | 0 | 1;
export interface Building {
    buildingType: buildingType,
    positionX: number,
    positionY: number,
    buildingLevel: buildingLevel,
    additionalInfo?: any,
}

export interface Population {
    level1: number,
    level2: number,
    level3: number,
    level4: number,
}

export interface Resources {
    level1: resource,
    level2: resource,
    level3: resource,
    level4: resource;
}

export type resource = Resource | 0;

export interface Resource {
    currency: number,
    mine: number,
    food: number,
    construction: number,
}

export interface Armies {
    // todo implement in the future
}

export interface Hallow {
    name: string,
    info: string
    // todo implement in the future
}