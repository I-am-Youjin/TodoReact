import React, { useState } from "react";
import Header from "./Layout/Header/Header";
import Main from "./Layout/Main/Main";
import { TodoContainer, BtnsContainer } from "./styles/stylesApp";
import { Button } from "@mui/material";
import { TodoCreatePortal } from "./components/TodoPortal/Portal/Portal";
import debounce from "lodash.debounce";

function App() {
  const [opened, setOpened] = useState(false);
  const handleOpenTodoPortal = () => {
    setOpened(!opened);
  };
  const debouncedHandle = debounce(handleOpenTodoPortal, 500);

  return (
    <div className="App">
      <Header />
      <Main>
        <BtnsContainer>
          <Button
            variant="contained"
            size="large"
            onClick={handleOpenTodoPortal}
          >
            Add
          </Button>
          <Button variant="outlined" size="large">
            Remove all
          </Button>
        </BtnsContainer>
        <TodoContainer>wewefwe</TodoContainer>
      </Main>
      <TodoCreatePortal isOpened={opened} onClick={debouncedHandle} />
    </div>
  );
}

export default App;
