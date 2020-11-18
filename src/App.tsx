import React, {useState} from 'react';
import './App.css';
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import {StartGame} from "./Game/Game"
import {withStyles} from "@material-ui/core/styles";
import {lightGreen} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
const StyledTitle = styled(Typography)`
  color: #eaeaea;
`;

export const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(lightGreen[500]),
        backgroundColor: lightGreen[500],
        '&:hover': {
            backgroundColor: lightGreen[700],
        },
    },
}))(Button);

function App() {

    const changeFlag = (event: any) => {
        event.preventDefault();
        setFlag(!flag);
    };

    const HomePage = () => {
        return (
            <div>
                <StyledTitle variant={"h2"}>
                    Simulation game
                </StyledTitle>
                <ColorButton onClick={changeFlag}>
                    Start a new game
                </ColorButton>
                <ColorButton>
                    Load game
                </ColorButton>
            </div>
        )
    };

    const ReturnToHome = () => {
        return (
            <ColorButton onClick={changeFlag}>
                Return to home
            </ColorButton>
        )
    };

    const [flag, setFlag] = useState(true);

    return (
        <div className='home'>
            {flag ? <HomePage/> : <StartGame/> }
            {flag ? <div/> : <ReturnToHome/> }
        </div>
    );
}

export default App;
