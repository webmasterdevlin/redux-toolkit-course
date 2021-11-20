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

import FormSubmission from "components/FormSubmission";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const VillainsPage = () => {
  const dispatch = useDispatch();
  const { villains, loading } = useSelector(
    (state: RootState) => state.villain
  );

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

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
          <Typography data-testid={"loading"} variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          villains?.map((v) => (
            <Box
              key={v?.id}
              mb={2}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <Typography>
                <span>{`${v?.firstName} ${v?.lastName} is ${v?.knownAs}`}</span>
                {counter === v?.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(v.id)}
                  variant={"contained"}
                  data-testid={"mark-button"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(softDeleteVillainAction(v.id))}
                  variant={"contained"}
                  color={"secondary"}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(deleteVillainAction(v.id))}
                  variant={"outlined"}
                  color={"secondary"}
                  data-testid={"delete-button"}
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
          data-testid={"refetch-button"}
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
