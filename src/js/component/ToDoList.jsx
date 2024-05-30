import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState({
    label: "",
  });

  const [tasks, setTasks] = useState([]);

  async function getInfo() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/Angie_Vanegas"
      );
      const data = await response.json();
      setTasks(data.todos);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  function handleChange(e) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  }

  async function handleKeyDown(e) {
    if (
      e.key === "Enter" &&
      inputValue &&
      typeof inputValue.label === "string" &&
      inputValue.label.trim()
    ) {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/Angie_Vanegas",
        {
          method: "POST",
          body: JSON.stringify({ label: inputValue.label }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        const postData = await response.json();
        setTasks([...tasks, { label: inputValue.label, id: postData.id }]);
        setInputValue({ label: "" });
      } else {
        console.log("No se puede crear");
      }
    }
  }

  async function deletePost(id) {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
      } else {
        throw new Error("No se pudo borrar la tarea");
      }
      const data = await response.json();
      const newTasksList = tasks.filter((task) => task.id !== id);
      setTasks(newTasksList);
    } catch (e) {
      console.log(e);
    }
  }

  function handleRemove(removeTask) {
    deletePost(removeTask);
    const deleteTask = tasks.filter((task) => {
      return task.id !== removeTask;
    });
    setTasks(deleteTask);
  }

  async function handleDeleteAllTasks() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/Angie_Vanegas"
      );
      const data = await response.json();
      const tasks = data.todos;
      for (const task of tasks) {
        await deletePost(task.id);
      }
    } catch (e) {
      console.log(e);
    }
    getInfo("");
  }

  return (
    <div className="mt-5 m-5 p-5">
      <input
        type="text"
        className="todolistInput form-control"
        placeholder="¿Whats needs to be done?"
        name="label"
        value={inputValue.label}
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
          {tasks.map((task) => (
            <li className="fontList list-group-item" key={task.id}>
              <div className="task-container">
                <span className="task-text">{task.label}</span>
                <span
                  onClick={() => handleRemove(task.id)}
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
      <button onClick={handleDeleteAllTasks}>Remove all tasks</button>
    </div>
  );
};

export default ToDoList;
