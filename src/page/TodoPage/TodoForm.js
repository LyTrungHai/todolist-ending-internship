import { Alert, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/sagas/todoSaga";
import { useSnackbar } from "notistack";

export default function TodoForm({ error, setError }) {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setTodo(value);
    // console.log(name, value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      setError("task can't be empty!");
      return;
    }
    // let today = new Date();
    // let dd = today.getDate();
    // let mm = today.getMonth() + 1;
    // let yyyy = today.getFullYear();
    // let n = today.toLocaleTimeString();
    // if (dd < 10) {
    //   dd = "0" + dd;
    // }
    // if (mm < 10) {
    //   mm = "0" + mm;
    // }
    // today = dd + "/" + mm + "/" + yyyy;

    const newTodo = {
      title: todo,
      status: false,
    };
    dispatch(addTodo(newTodo, enqueueSnackbar));
    setTodo("");
  };
  const handleBlur = (e) => {
    setError("");
  };

  return (
    <div>
      <form
        className="form-container"
        onSubmit={handleAddTodo}
        onChange={handleBlur}
      >
        <Input
          className="input-todo-text"
          placeholder="Enter todo..."
          name="inputTodo"
          autoComplete="off"
          disableUnderline={true}
          autoFocus={true}
          onChange={handleChange}
          value={todo}
        />
        <button className="btn-submit" type="submit">
          Add todo
        </button>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
}
