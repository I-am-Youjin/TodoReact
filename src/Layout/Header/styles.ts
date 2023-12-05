import styled from "styled-components";

export const StyledHeader = styled("header")`
  width: auto;
  display: flex;
  border-bottom: 1px solid #1976d2;
  -webkit-box-shadow: 0px 10px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 10px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 10px 10px 2px rgba(34, 60, 80, 0.2);
  margin-bottom: 10vh;
`;

export const Logo = styled("h1")<{ $color: string }>`
  font-size: 32px;
  line-height: 34px;
  margin: 0;
  color: ${(prop) => prop.$color};
`;

export const LogoContainer = styled("div")`
  width: 1200px;
  padding: 10px;
  margin: 0 auto;
  display: flex;
`;
