import styled from "styled-components";

export const PortalWindowWrapper = styled("div")<{ $isOpened: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${(prop) => (prop.$isOpened ? "visible" : "hidden")};
  width: 100vw;
  height: 100vh;
  transition: all.3s;
`;

export const TodoAddWindow = styled("div")<{ $isOpened: boolean }>`
  position: absolute;
  top: ${(prop) => (prop.$isOpened ? "30vh" : "-80vh")};
  left: 30vw;
  padding: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1vh;
  background-color: #fff;
  width: 40vw;
  height: 40vh;
  border-radius: 10px;
  overflow: auto;
  transition: all.3s;
`;

export const BtnsContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;
export const TagsContainer = styled("div")`
  display: flex;
  gap: 0.5em;
  max-height: 5vh;
  overflow: auto;
`;

export const InputsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
`;

export const Text = styled("p")`
  font-size: 16px;
  font-weight: 500;
`;
export const Tags = styled("p")`
  font-size: 16px;
  font-weight: 500;
  color: #1976d2;
`;
