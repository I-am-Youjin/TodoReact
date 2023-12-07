import React, { useState } from "react";
import Header from "./Layout/Header/Header";
import Main from "./Layout/Main/Main";
import { TodoContainer, BtnsContainer } from "./styles/stylesApp";
import { Button } from "@mui/material";
import { TodoCreatePortal } from "./components/TodoPortal/Portal/Portal";
import debounce from "lodash.debounce";
import TodoCard from "./components/TodoCard/TodoCard";
import { useTypedSelector } from "./store/hooks/useTypedSelector";
import { ITodoData } from "./types";
import MultipleSelectCheckmarks from "./components/TagSelector/TagSelector";
import { useActions } from "./store/hooks/useActions";

function App() {
  const [opened, setOpened] = useState(false);
  const todos = useTypedSelector((state) => state.todosStore.todos);
  const filter = useTypedSelector((state) => state.todosStore.filter);
  const inputContainerRef = React.useRef(null);
  const { clearTodosArray } = useActions();
  const handleOpenTodoPortal = () => {
    setOpened(!opened);
  };
  const debouncedHandle = debounce(handleOpenTodoPortal, 500);
  // const tagsValue =
  //   inputContainerRef.current?.children[2].children[0].children[1].children[1]
  //     .value;

  return (
    <div className="App">
      <Header />
      <Main>
        <BtnsContainer ref={inputContainerRef}>
          <Button
            variant="contained"
            size="large"
            onClick={handleOpenTodoPortal}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => clearTodosArray()}
          >
            Remove all
          </Button>
          <MultipleSelectCheckmarks />
        </BtnsContainer>
        <TodoContainer>
          {todos &&
            (todos as [])
              .filter((data: ITodoData) => {
                if (filter) {
                  const filterArr = (filter as string).split(", ");
                  for (let tag of filterArr) {
                    if (data.tag.includes(tag)) {
                      return data;
                    }
                  }
                } else return data;
              })
              .map((data: ITodoData) => (
                <TodoCard
                  title={data.title}
                  description={data.description}
                  tag={data.tag}
                  id={data.id}
                />
              ))}
        </TodoContainer>
      </Main>
      <TodoCreatePortal isOpened={opened} onClick={debouncedHandle} />
    </div>
  );
}

export default App;
