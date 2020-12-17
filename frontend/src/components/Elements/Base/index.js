import React from "react";
import { Container } from "reactstrap";
import Header from "./Header/Header";

const Base = (props) => {
  return (
    <>
      <Header />
      <Container>{props.children}</Container>
    </>
  );
};

export default Base;
