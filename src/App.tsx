import React, { useCallback, useEffect, useState } from "react";
import Header from "./Layout/Header/Header";
import Main from "./Layout/Main/Main";
import { TodoContainer, BtnsContainer } from "./styles/stylesApp";
import { Button } from "@mui/material";
import { TodoCreatePortal } from "./components/TodoPortal/Portal/Portal";
import TodoCard from "./components/TodoCard/TodoCard";
import { useTypedSelector } from "./store/hooks/useTypedSelector";
import { ITodoData } from "./types";
import MultipleSelectCheckmarks from "./components/TagSelector/TagSelector";
import { useActions } from "./store/hooks/useActions";
import { Stores, getStoreData, clearData, IDbData, initDB } from "./lib/db";

function App() {
  const [opened, setOpened] = useState(false);
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  const [dbData, setDbData] = useState<IDbData[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const todos = useTypedSelector((state) => state.todosStore.todos);
  const filter = useTypedSelector((state) => state.todosStore.filter);
  const inputContainerRef = React.useRef(null);
  const { clearTodosArray } = useActions();
  const [error, setError] = useState("");
  const { setTodo, setTodoTags } = useActions();

  const handleOpenTodoPortal = () => {
    setOpened(!opened);
  };

  const handleInitDB = async () => {
    const status = await initDB();
    setIsDBReady(status);
  };

  const handleGetUsers = async () => {
    const storedb = await getStoreData<IDbData>(Stores.TodosStore);
    setDbData(storedb);
    if (!isFetched) {
      setIsFetched(true);
    }
  };

  const handleRemoveTodos = () => {
    clearData(Stores.TodosStore);
    clearTodosArray();
  };

  const handleUpdate = async () => {
    await handleGetUsers();
    if (!!dbData.length) {
      dbData.map((todo) => {
        setTodo({
          title: todo.data.title,
          description: todo.data.description,
          id: todo.data.id,
          tag: todo.data.tag,
        });
        if (todo.data.tag) {
          todo.data.tag.split(", ").map((tag) => {
            setTodoTags(tag);
          });
        }
      });
    }
  };

  useEffect(() => {
    !isDBReady ? handleInitDB() : handleUpdate();
  }, [isDBReady, isFetched]);

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
          <Button variant="outlined" size="large" onClick={handleRemoveTodos}>
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
      <TodoCreatePortal isOpened={opened} onClick={handleOpenTodoPortal} />
    </div>
  );
}

export default App;
