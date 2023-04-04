import React from "react";
import { BiCalendarEdit } from "react-icons/bi";
import "./TodoApp.css";

const ToDo = ({ text, updateMode, deleteToDo }) => {
  return (
    <div className="todo">
      <div className="icons">
        <input
          type="checkbox"
          className="deleteicn"
          id="delete"
          onClick={deleteToDo}
        />
        {text}
        <BiCalendarEdit
          className="list-item-icons"
          id="edit"
          onClick={updateMode}
        />
      </div>
    </div>
  );
};

export default ToDo;
