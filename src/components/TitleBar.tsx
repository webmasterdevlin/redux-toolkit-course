import React from "react";
import { Box, Button } from "@material-ui/core";

type Props = {
  title: string;
};

const TitleBar = ({ title }: Props) => (
  <Box mb={5}>
    <h1 data-cy="title-page">{title}</h1>
  </Box>
);

export default TitleBar;
