import {savedGame} from "../Model/savedGameConsts";
import React from "react";
import {GameValidation} from "./GameValidation";
import {Canvas} from "./conponents/Cancvas";
import styled from "styled-components";
import {Typography} from "@material-ui/core";

const StyledText = styled(Typography)`
  color: #eaeaea;
`;
export class Game {
    private gameJ: savedGame;
    private gameStatus: boolean;


    constructor(gameJson: savedGame) {
        this.gameJ = gameJson;
        this.gameStatus = false;

    }

    getNumberOfPop() {
        return this.gameJ.population.level1 +
            this.gameJ.population.level2 +
            this.gameJ.population.level3 +
            this.gameJ.population.level4;
    }
    getCurrency() {
        // @ts-ignore
        return this.gameJ.resources.level1.currency;
    }
}


export const StartGame = () => {

    let gameJson;
    try {
        gameJson = GameValidation();
    } catch (e) {
        alert(`Game file validation failed for: ${e}`);
    }
    let game = new Game(gameJson as savedGame);

    const numberOfLands = game.getNumberOfPop();

    return (
        <div>
            <StyledText variant='h5'>
                Population: {numberOfLands} | |
                Population: {numberOfLands} | |
                Population: {numberOfLands} | |
                Population: {numberOfLands} | |
            </StyledText>
            <StyledText>
                Currency: {game.getCurrency()}
            </StyledText>
            <Canvas/>
        </div>
    )
};

