import React from "react";
import "./TodoApp.css";
import { useState, useRef, useEffect } from "react";
import Todo from "./Todo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./Api";

function TodoApp() {

// Defines a functional component that initializes using the useState hook
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(id);
  };

  // To avoid rendering form during every submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // To make input field focus and initialize value to null

  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="container">
      <h2>Todo App</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          ref={inputRef}
          placeholder="Make your list"
          className="form-control"
          onChange={(event) => setText(event.target.value)}
        />
        <button
          onClick={
            isUpdating
              ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
              : () => addToDo(text, setText, setToDo)
          }
        >
          {isUpdating ? "Update" : "Add"}
        </button>
      </form>
      <div className="list">
        <ul>
          {toDo.map((item) => (
            <Todo
              key={item.id}
              text={item.text}
              updateMode={() => updateMode(item.id, item.text)}
              deleteToDo={() => deleteToDo(item.id, setToDo)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
