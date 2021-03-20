import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleBar from "components/TitleBar";
import UpdateUiLabel from "components/UpdateUiLabel";
import {
  deleteVillainAction,
  getVillainsAction,
  postVillainAction,
} from "features/villains/villainAsyncActions";
import { softDeleteVillainAction } from "features/villains/villainSlice";
import { RootState } from "store/reducers";

import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FormSubmission from "components/FormSubmission";

const VillainsPage = () => {
  const dispatch = useDispatch();
  const { villains, loading } = useSelector(
    (state: RootState) => state.villain
  );

  const classes = useStyles();
  const smallScreen = useMediaQuery("(max-width:600px)");

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    dispatch(getVillainsAction());
  }, [dispatch]);

  return (
    <div>
      <TitleBar title={"Super Villains Page"} />
      <FormSubmission handleCreateAction={postVillainAction} />
      <UpdateUiLabel />
      <>
        {loading ? (
          <Typography variant={"h2"}>Loading.. Please wait..</Typography>
        ) : (
          villains.map((v) => (
            <Box
              key={v.id}
              role={"card"}
              mb={2}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <Typography>
                <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
                {counter === v.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(v.id)}
                  variant={"contained"}
                  color={"default"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(softDeleteVillainAction(v.id))}
                  variant={"contained"}
                  color={"secondary"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(deleteVillainAction(v.id))}
                  variant={"outlined"}
                  color={"secondary"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {villains.length === 0 && !loading && (
        <Button
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={() => dispatch(getVillainsAction())}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
};

export default VillainsPage;

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
