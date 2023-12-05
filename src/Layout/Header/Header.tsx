import React from "react";
import { StyledHeader, Logo, LogoContainer } from "./styles";

const Header = () => {
  return (
    <StyledHeader>
      <LogoContainer>
        <Logo $color="red">A</Logo>
        <Logo $color="green">B</Logo>
        <Logo $color="blue">C</Logo>
      </LogoContainer>
    </StyledHeader>
  );
};

export default Header;
