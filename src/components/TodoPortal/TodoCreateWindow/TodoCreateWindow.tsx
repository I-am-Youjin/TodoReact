import React, { useState, useRef, useEffect } from "react";
import { ITodoCreate } from "../../../types";
import {
  PortalWindowWrapper,
  TodoAddWindow,
  BtnsContainer,
  InputsContainer,
  Text,
  Tags,
  TagsContainer,
} from "./styles";
import UnstyledInputBasic from "../../CustomInput/CustomInput";
import InputMultilineAutosize from "../../CustomTextarea/CustomTextarea";
import { ITodoData } from "../../../types";
import { useTypedSelector } from "../../../store/hooks/useTypedSelector";
import { Button } from "@mui/material";
import { useActions } from "../../../store/hooks/useActions";

const TodoCreateWindow: React.FC<ITodoCreate> = ({
  isOpened,
  onClick,
  defaultState,
}) => {
  const dynamicId = useTypedSelector((state) => state.todosStore.todos?.length);
  const inputRef = useRef(null);
  const textareaValue = inputRef?.current?.children[1]?.children[0].value;
  const inputValue = inputRef?.current?.children[0]?.children[0].value;

  const TodoData: ITodoData = {
    title: "",
    description: "",
    id: 0,
    tag: "",
  };

  const [todoDataState, setTodoDataState] = useState(
    defaultState ? defaultState : TodoData
  );
  const [dynamicIdState, setDynamicIdState] = useState(dynamicId);
  const [todoTagsState, setTodoTagsState] = useState(TodoData.tag);
  const todos = useTypedSelector((state) => state.todosStore.todos);
  const { setTodo, setTodoTags, removeTodo, removeTags, removeUnicTags } =
    useActions();

  useEffect(() => {
    const tags = (inputValue + " " + textareaValue)
      ?.split(" ")
      .filter((word) => {
        return word.includes("#");
      })
      .join(", ");

    setTodoTagsState(tags);
  }, [textareaValue, inputValue]);

  useEffect(() => {
    setDynamicIdState(todos.length);
  }, [todos.length]);

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
        return {
          ...prevData,
          [fieldName]: event.target.value,
          id: dynamicIdState,
        };
      }
    );
  };

  const handleAddTodo = () => {
    if (defaultState) {
      console.log(defaultState);
      const tags = defaultState.tag.split(", ");
      for (let tag of tags) {
        removeTags(tag);
        removeUnicTags(tag);
      }
      removeTodo(defaultState.id);

      if (todoDataState.description && todoDataState.title) {
        setTodo({
          title: todoDataState.title,
          description: todoDataState.description,
          id: defaultState.id,
          tag: todoTagsState,
        });
        if (!defaultState) {
          setTodoDataState(TodoData);
        }
        onClick();
      }
      if (todoTagsState) {
        todoTagsState.split(", ").map((tag) => setTodoTags(tag));
      }
    } else {
      if (todoDataState.description && todoDataState.title) {
        setTodo({
          title: todoDataState.title,
          description: todoDataState.description,
          id: todoDataState.id,
          tag: todoTagsState,
        });
        if (!defaultState) {
          setTodoDataState(TodoData);
        }
        onClick();
      }
      if (todoTagsState) {
        todoTagsState.split(", ").map((tag) => setTodoTags(tag));
      }
    }
  };

  const handleDislineTodo = () => {
    setTodoDataState(TodoData);
    onClick();
  };

  return (
    <div>
      <PortalWindowWrapper
        $isOpened={isOpened}
        onClick={onClick}
      ></PortalWindowWrapper>
      <TodoAddWindow $isOpened={isOpened}>
        <InputsContainer ref={inputRef}>
          <UnstyledInputBasic
            value={todoDataState.title}
            onChange={(event) => handleChangeValue("title", event)}
          />
          <InputMultilineAutosize
            value={todoDataState.description}
            onChange={(event) => handleChangeValue("description", event)}
          />
          <TagsContainer>
            <Text>Tags:</Text>
            <Tags>{todoTagsState}</Tags>
          </TagsContainer>
        </InputsContainer>
        <BtnsContainer>
          <Button variant="outlined" size="large" onClick={handleDislineTodo}>
            Disline
          </Button>
          <Button variant="contained" size="large" onClick={handleAddTodo}>
            Add
          </Button>
        </BtnsContainer>
      </TodoAddWindow>
    </div>
  );
};

export default TodoCreateWindow;
