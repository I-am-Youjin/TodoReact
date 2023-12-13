import React, { useEffect, useState } from "react";
import {
  StyledContainer,
  InnerContainer,
  DataContainer,
  BtnsContainer,
} from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { ITodoData } from "../../types";
import { useActions } from "../../store/hooks/useActions";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import EditIcon from "@mui/icons-material/Edit";
import { TodoCreatePortal } from "../TodoPortal/Portal/Portal";
import { Stores, deleteData } from "../../lib/db";

const TodoCard: React.FC<ITodoData> = ({ title, description, tag, id }) => {
  const defaultState: ITodoData = {
    title,
    description,
    tag,
    id,
  };
  const { removeTodo, removeTags, removeUnicTags } = useActions();
  const todos = useTypedSelector((state) => state.todosStore.todos);
  const filter = useTypedSelector((state) => state.todosStore.filter);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [data, setData] = useState<ITodoData>(defaultState);
  const [error, setError] = useState("");

  const handleRemoveData = async (id) => {
    try {
      await deleteData(Stores.TodosStore, id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong deleting the user");
      }
    }
  };

  const handleRemoveTodo = () => {
    const tagsArray = tag.split(", ");

    for (let tag of tagsArray) {
      removeTags(tag);
      removeUnicTags(tag);
    }
    removeTodo(id);
    console.log(`${id}`);
    handleRemoveData(id);
  };

  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    setData(
      todos.find((todo: ITodoData) => {
        return todo.id === id;
      })
    );
  }, [todos.length, filter]);

  return (
    <StyledContainer>
      <InnerContainer>
        <DataContainer $width="20%">Title: {title}</DataContainer>
        <DataContainer $width="40%">Description: {description}</DataContainer>
        <DataContainer $width="20%">Tag: {tag}</DataContainer>
      </InnerContainer>
      <BtnsContainer>
        <Button size="small" onClick={handleRemoveTodo}>
          <CloseIcon color="action" fontSize="large" />
        </Button>
        <Button size="small" onClick={handleEdit}>
          <EditIcon color="action" fontSize="large" />
        </Button>
      </BtnsContainer>
      <TodoCreatePortal
        isOpened={openEdit}
        onClick={handleEdit}
        defaultState={data}
      ></TodoCreatePortal>
    </StyledContainer>
  );
};

export default TodoCard;
