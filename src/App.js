import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Checkbox,
  Typography,
} from "@material-ui/core";
import "./App.css";
import { call, signout } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const add = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };
  const deleteTodo = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };
  const update = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };
  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  //완료 모두 삭제
  const handleDeleteAll = () => {
    if (items.length > 0) {
      items.map((item, idx) => {
        if (item.done === true) {
          deleteTodo(item);
        }
        return "deleteAll";
      });
    }
  };

  //모두선택
  const selectAll = () => {
    if (items.length > 0) {
      items.map((item, idx) => {
        item.done = true;
        update(item);
        // return "selectAll"
      });
    }
    window.location.reload();
  };
  var todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo item={item} key={item.id} delete={deleteTodo} update={update} />
        ))}
      </List>
    </Paper>
  );
  //navigationBar
  var navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  // loading 중이 아닐 때
  var todoListPage = (
    <div>
      {navigationBar}{" "}
      <Container maxWidth="md">
        <AddTodo add={add} />
        <div className="upbar">
          <div className="left">
          <Checkbox onChange={selectAll} />
          </div>
          <div className="space">

          </div>
          <div className="right">
            {items.length > 0 && (
              <Button
                onClick={handleDeleteAll}
                variant="contained"
                color="success"
                size="medium"
                style={{ marginLeft: "16px" }}
              >
                완료한 항목 삭제
              </Button>
            )}
          </div>
        </div>
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
  //loading 중일 때
  var loadingPage = <h1>로딩중..</h1>;
  var content = loadingPage;
  if (!loading) {
    content = todoListPage;
  } // 생성된 컴포넌트 JPX를 리턴한다.
  return <div className="App">{content} </div>;
}
export default App;
