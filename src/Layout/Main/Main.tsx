import React from "react";
import { StyledMain } from "./styles";

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
