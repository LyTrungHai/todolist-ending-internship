import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import { Box, fontSize } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./TodoPage.css";
import { useDispatch } from "react-redux";
import { getTodoApi } from "../../redux/sagas/todoSaga";

export default function Todo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const getUserLogin = useSelector((state) => state.loginReducer.userLogin);
  let { email } = getUserLogin;
  const getTodo = useSelector((state) => state.todoReducer);
  const doneTodo = getTodo.filter((todo) => todo.status === "true");
  const pendingTodo = getTodo.filter((todo) => todo.status === "false");
  const [filter, setFilter] = useState("allTodo");
  // console.log(getTodo);
  const formTodoStyle = {
    pt: 10,
    my: 0,
    mx: "auto",
    width: 550,
  };

  useEffect(() => {
    dispatch(getTodoApi());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filterTodo = () => {
    if (filter === "allTodo") return getTodo;
    else if (filter === "pendingTodo") return pendingTodo;
    else if (filter === "doneTodo") return doneTodo;
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box className="todo-container">
          <Header userEmail={email} />
          <Grid
            sx={formTodoStyle}
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <TodoForm error={error} setError={setError} />

            {/* SELECTED TODO  */}
            <BottomNavigation showLabels className="form-filter">
              <BottomNavigationAction
                label="All"
                value="allTodo"
                onClick={() => setFilter("allTodo")}
                sx={{ fontSize: "24px" }}
                className={
                  filter === "allTodo" ? " filter-active" : "filter - button"
                }
              />
              <BottomNavigationAction
                onClick={() => setFilter("pendingTodo")}
                label="Pending"
                className={
                  filter === "pendingTodo"
                    ? "filter-button filter-active"
                    : "filter - button"
                }
              />
              <BottomNavigationAction
                onClick={() => setFilter("doneTodo")}
                label="Done"
                className={
                  filter === "doneTodo"
                    ? "filter-button filter-active"
                    : "filter - button"
                }
              />
            </BottomNavigation>
            {/* ****  */}
            <TodoList listTodo={filterTodo()} setError={setError} />
          </Grid>
          <Footer />
        </Box>
      )}
    </>
  );
}
