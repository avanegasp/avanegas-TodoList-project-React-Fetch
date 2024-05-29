import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  // const [info, setInfo] = useState([]);

  async function getInfo() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/Angie_Vanegas"
      );
      const data = await response.json();
      setTasks(data.todos);
      console.log("esto es data.todos.....", data.todos);
      console.log("esto es data.....", data);
    } catch (e) {
      console.log("se borró la bd.......", e);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && inputValue.trim()) {
      setTasks([...tasks, inputValue.trim()]);
      setInputValue("");
    }
  }

  function handleRemove(removeTask) {
    const deleteTask = tasks.filter((_, index) => {
      return index !== removeTask;
    });
    setTasks(deleteTask);
  }

  //  https://playground.4geeks.com/todo/todos/Angie_Vanegas

  return (
    <div className="mt-5 m-5 p-5">
      <input
        type="text"
        className="todolistInput form-control"
        placeholder="¿Whats needs to be done?"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div>
        {tasks.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No hay tareas, añadir tareas
          </div>
        ) : null}
        <ol className="list-group">
          {tasks.map((task, index) => (
            <li className="fontList list-group-item" key={index}>
              <div className="task-container">
                <span className="task-text">{task.label}</span>
                <span
                  onClick={() => handleRemove(index)}
                  className="remove-icon"
                >
                  X
                </span>
              </div>
            </li>
          ))}
          {tasks.length === 0 ? (
            <div>
              <span className="numberLeft"></span>
            </div>
          ) : (
            <div>
              <span className="numberLeft">{tasks.length} Item left</span>
            </div>
          )}
        </ol>
      </div>
    </div>
  );
};

export default ToDoList;
