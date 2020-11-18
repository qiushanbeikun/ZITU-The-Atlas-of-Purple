import {savedGame} from "../Model/savedGameConsts";

export class Game {
    private gameJ: savedGame;

    constructor(gameJson: savedGame) {
        this.gameJ = gameJson;
    }


}