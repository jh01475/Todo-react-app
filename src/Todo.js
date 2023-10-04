import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
function Todo(props) {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const deleteEventHandler = () => {
    props.delete(item);
  };
  const offReadOnlyMode = () => {
    setReadOnly(false);
  };
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
      props.update(item);
    }
  };
  const editEventHandler = (e) => {
    const thisItem = { ...item };
    thisItem.title = e.target.value;
    setItem(thisItem);
  };

  const checkboxEventHander = (e) => {
    const thisItem = { ...item };
    thisItem.done = thisItem.done ? false : true; // thisItemdone = !thisitem.done
    setItem(thisItem);
    setReadOnly(true);
    props.update(thisItem);
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHander} />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",
            readOnly: readOnly,
          }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
          onClick={offReadOnlyMode}
          onChange={editEventHandler}
          onKeyPress={enterKeyEventHandler}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
export default Todo;
