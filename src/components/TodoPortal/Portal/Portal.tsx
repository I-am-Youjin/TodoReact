import React from "react";
import ReactDom from "react-dom";
import TodoCreateWindow from "../TodoCreateWindow/TodoCreateWindow";
import { ITodoCreate } from "../../../types";

const portal = document.getElementById("portal");

export const TodoCreatePortal: React.FC<ITodoCreate> = ({
  isOpened,
  onClick,
}) =>
  ReactDom.createPortal(
    <TodoCreateWindow isOpened={isOpened} onClick={onClick} />,
    portal as HTMLElement
  );
