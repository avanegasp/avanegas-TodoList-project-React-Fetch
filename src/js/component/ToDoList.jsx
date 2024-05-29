import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState({
    label: "",
  });

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
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    console.log("inputvalue.....", inputValue);
    console.log("e.target.value", e.target.value);
    console.log("[e.target.name]", [e.target.name]);
  }

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      // && inputValue.label.trim()
      console.log("Esto es event...", e);

      // console.log("Input value:", inputValue);
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
        console.log(response);
        const postData = await response.json();
        setTasks([...tasks, { label: inputValue.label, id: postData.id }]);
        console.log("esto es postdata.....", postData);
        setInputValue({ label: "" });
      } else {
        console.log("No se puede crear");
      }
    }
  }

  function handleRemove(removeTask) {
    const deleteTask = tasks.filter((task) => {
      console.log("este elementttoooo", task);
      return task.id !== removeTask;
    });
    setTasks(deleteTask);
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
    </div>
  );
};

export default ToDoList;
