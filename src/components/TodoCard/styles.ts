import styled from "styled-components";

export const StyledContainer = styled("div")`
  background-color: #1976d2;
  height: 200px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
`;

export const DataContainer = styled("div")<{ $width: string }>`
  height: 100%;
  width: ${(prop) => prop.$width};
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
`;

export const InnerContainer = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const BtnsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
