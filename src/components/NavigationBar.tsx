import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/reducers";

import TotalOfCharacters from "./TotalOfCharacters";
import { pathNames } from "../LazyRoutes";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const NavigationBar = () => {
  const store = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <AppBar position="static" style={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box>
          <Button
            className={classes.button}
            onClick={() => navigate(pathNames.home)}
            color="inherit"
          >
            Home
          </Button>
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => navigate(pathNames.antiHeroes)}
            color="inherit"
            data-testid="nav-anti-heroes"
          >
            Anti Heroes
          </Button>
          <TotalOfCharacters
            collection={store.antiHero.antiHeroes}
            dataTestId={"total-anti-heroes"}
          />
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => navigate(pathNames.heroes)}
            color="inherit"
            data-testid="nav-heroes"
          >
            Heroes
          </Button>
          <TotalOfCharacters
            collection={store.hero.heroes}
            dataTestId={"total-heroes"}
          />
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => navigate(pathNames.villains)}
            color="inherit"
            data-testid="nav-villains"
          >
            Villains
          </Button>
          <TotalOfCharacters
            collection={store.villain.villains}
            dataTestId={"total-villains"}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
