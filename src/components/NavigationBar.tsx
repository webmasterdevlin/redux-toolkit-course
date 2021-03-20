import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/reducers";
import { AppBar, Box, Button, createStyles, Toolbar } from "@material-ui/core";
import TotalOfCharacters from "./TotalOfCharacters";
import { makeStyles } from "@material-ui/styles";

const NavigationBar = () => {
  const store = useSelector((state: RootState) => state);
  const history = useHistory();
  const classes = useStyles();
  return (
    <AppBar position="static" style={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/")}
            color="inherit"
          >
            Home
          </Button>
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/anti-heroes")}
            color="inherit"
            data-testid="nav-anti-heroes"
          >
            Anti Heroes
          </Button>
          <TotalOfCharacters
            collection={store.antiHero.antiHeroes}
            role={"total-anti-heroes"}
          />
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/heroes")}
            color="inherit"
            data-testid="nav-heroes"
          >
            Heroes
          </Button>
          <TotalOfCharacters
            collection={store.hero.heroes}
            role={"total-heroes"}
          />
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/villains")}
            color="inherit"
          >
            Villains
          </Button>
          <TotalOfCharacters
            collection={store.villain.villains}
            role={"total-villains"}
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
