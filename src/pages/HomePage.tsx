import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const HomePage = () => {
  return (
    <Container>
      <Box
        width={"100%"}
        display={"flex"}
        flex={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <h1>Welcome to Redux Toolkit Course 🧑‍🏫 💻</h1>
      </Box>
    </Container>
  );
};

export default HomePage;
