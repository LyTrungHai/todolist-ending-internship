import React, { useRef, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { IconButton, Input, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { ListItemText } from "@mui/material";
import moment from "moment";
import { updateTodo } from "../../redux/sagas/todoSaga";

export default function TodoEdit({ todo, setError }) {
  const [edit, setEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const newRef = useRef({});

  const handleEdit = () => {
    setEdit(!edit);

    if (edit) {
      const newTitle = newRef.current[todo.id].value;
      if (newTitle.trim() === "") {
        setError("task can't be empty");
        return false;
      }
      dispatch(updateTodo(todo, newTitle, enqueueSnackbar));
    }
  };

  return (
    <>
      {!edit ? (
        <ListItemText
          secondary={moment(todo.date).format("DD/MM/yyyy")}
          sx={{
            textDecoration:
              todo.status === "true" ? "line-through red" : "none",
          }}
          primary={todo.title}
          secondaryTypographyProps={{ textDecoration: "none" }}
          className="todo-title"
          style={{
            textDecoration:
              todo.status === "true" ? "line-through red" : "none",
            fontStyle: todo.status === "true" ? "italic" : "normal",
            color: todo.status === "true" ? "red" : "",
          }}
        />
      ) : (
        <Input
          fullWidth
          defaultValue={todo.title}
          inputRef={(e) => (newRef.current[todo.id] = e)}
        />
      )}
      <IconButton
        onClick={() => {
          handleEdit();
        }}
      >
        {!edit ? <BorderColorIcon /> : <BeenhereIcon />}
      </IconButton>
    </>
  );
}
