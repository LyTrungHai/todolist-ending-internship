import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch } from "react-redux";
import { Checkbox, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
// import ListItemText from "@mui/material/ListItemText";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import BeenhereIcon from "@mui/icons-material/Beenhere";
// import moment from "moment";
import { checkComplete, DeleteTodo } from "../../redux/sagas/todoSaga";
import { useSnackbar } from "notistack";
import TodoEdit from "./TodoEdit";

export default function TodoList({ setError, listTodo }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTodo = (todo) => {
    dispatch(DeleteTodo(todo.id, enqueueSnackbar));
  };

  const checkCompleteTodo = (todo) => {
    dispatch(checkComplete(todo));
  };

  return (
    <>
      {listTodo.length === 0 ? (
        <div>notthing here</div>
      ) : (
        <Box sx={{ mb: 5 }}>
          {listTodo.map((todo) => (
            <ListItemButton
              key={todo.id}
              color="success"
              sx={{ borderBottom: 1 }}
              className="todo-item"
            >
              <ListItemIcon>
                <Checkbox
                  color="success"
                  checked={todo.status === "true" ? true : false}
                  onChange={() => {
                    checkCompleteTodo(todo);
                  }}
                />
              </ListItemIcon>
              <TodoEdit
                todo={todo}
                edit={edit}
                setEdit={setEdit}
                setError={setError}
              />
              <IconButton
                className="icon-delete"
                onClick={() => {
                  handleDeleteTodo(todo);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          ))}
        </Box>
      )}
    </>
  );
}
