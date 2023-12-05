import React, { useState, useRef } from "react";
import { ITodoCreate } from "../../../types";
import {
  PortalWindowWrapper,
  TodoAddWindow,
  BtnsContainer,
  InputsContainer,
  Text,
  Tags,
} from "./styles";
import UnstyledInputBasic from "../../CustomInput/CustomInput";
import InputMultilineAutosize from "../../CustomTextarea/CustomTextarea";
import { ITodoData } from "../../../types";
import { useTypedSelector } from "../../../store/hooks/useTypedSelector";
import { Button } from "@mui/material";

const TodoCreateWindow: React.FC<ITodoCreate> = ({ isOpened, onClick }) => {
  const dynamicId = useTypedSelector((state) => state.todos.todos.length);

  const TodoData: ITodoData = {
    title: "",
    description: "",
    id: dynamicId,
    tag: "",
  };

  const [todoDataState, setTodoDataState] = useState(TodoData);

  const handleChangeValue = (
    fieldName: keyof ITodoData,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodoDataState(
      (prevData: {
        title: string;
        description: string;
        id: number;
        tag: string;
      }) => {
        return { ...prevData, [fieldName]: event.target.value };
      }
    );
  };

  const tags = todoDataState.description
    .split(" ")
    .filter((word) => {
      return word.includes("#");
    })
    .join(", ");

  return (
    <div>
      <PortalWindowWrapper
        $isOpened={isOpened}
        onClick={onClick}
      ></PortalWindowWrapper>
      <TodoAddWindow $isOpened={isOpened}>
        <InputsContainer>
          <UnstyledInputBasic
            value={todoDataState.title}
            onChange={(event) => handleChangeValue("title", event)}
          />
          <InputMultilineAutosize
            value={todoDataState.description}
            onChange={(event) => handleChangeValue("description", event)}
          />
          <Text>Tags:{tags}</Text>
        </InputsContainer>
        <BtnsContainer>
          <Button variant="outlined" size="large">
            Disline
          </Button>
          <Button variant="contained" size="large">
            Add
          </Button>
        </BtnsContainer>
      </TodoAddWindow>
    </div>
  );
};

export default TodoCreateWindow;
