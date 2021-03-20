import React from "react";
import { Box } from "@material-ui/core";

type Props = {
  title: string;
};

const TitleBar = ({ title }: Props) => (
  <Box mb={5}>
    <h1 data-testid="title-page">{title}</h1>
  </Box>
);

export default TitleBar;
