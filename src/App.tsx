import React from 'react';
import './App.css';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import {GameValidation} from "./Game/GameValidation";

const StyledTitle = styled(Typography)`
  color: #eaeaea;
`;

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[500],
    '&:hover': {
      backgroundColor: lightGreen[700],
    },
  },
}))(Button);

function App() {


  return (
      <div>
        <StyledTitle variant={"h2"}>
          Simulation game.
        </StyledTitle>
        <ColorButton onClick={GameValidation}>
          Start a new game
        </ColorButton>
        {/*<ColorButton onClick={SavedGameStart}>*/}
        {/*  Load a saved game*/}
        {/*</ColorButton>*/}
      </div>
  );
}

export default App;