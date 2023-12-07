import React, { useEffect } from "react";
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
import { debounce } from "lodash.debounce";

const TodoCard: React.FC<ITodoData> = ({ title, description, tag, id }) => {
  const defaultState: ITodoData = {
    title,
    description,
    tag,
    id,
  };
  const { removeTodo, removeTags, removeUnicTags } = useActions();
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleRemoveTodo = () => {
    const tagsArray = tag.split(", ");

    for (let tag of tagsArray) {
      removeTags(tag);
      removeUnicTags(tag);
    }
    removeTodo(defaultState.id);
  };

  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };

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
        defaultState={defaultState}
      ></TodoCreatePortal>
    </StyledContainer>
  );
};

export default TodoCard;
