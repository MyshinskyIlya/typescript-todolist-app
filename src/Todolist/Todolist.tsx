import React, { useState } from "react";
import { FilterValuesType } from "../App";
import "./Todolist.css";

// ------------------------ TypeScript ----------------
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}[];

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  // ------------------------ Hooks ---------------------
  // local state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  // ------------------------ App ---------------------
  return (
    <div>
      <h3>
        {props.title}
        <button onClick={() => props.removeTodoList(props.id)}>x</button>
      </h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => {
            setNewTaskTitle(e.currentTarget.value);
          }}
          onKeyPress={(e) => {
            setError(null);
            if (e.key == "Enter") {
              if (
                newTaskTitle.trim() !== "" &&
                !+newTaskTitle.trim() &&
                +newTaskTitle.trim() != 0
              ) {
                props.addTask(newTaskTitle.trim(), props.id);
              } else {
                setError("Title is required");
              }
              setNewTaskTitle("");
            }
          }}
          className={error ? "error" : ""}
        />
        <button
          onClick={() => {
            if (
              newTaskTitle.trim() !== "" &&
              !+newTaskTitle.trim() &&
              +newTaskTitle.trim() != 0
            ) {
              props.addTask(newTaskTitle.trim(), props.id);
            } else {
              setError("Title is required");
            }
            setNewTaskTitle("");
          }}
        >
          +
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          return (
            <li key={t.id} className={t.isDone == true ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={(e) => {
                  props.changeStatus(t.id, e.currentTarget.checked, props.id);
                }}
              />
              <span>{t.title}</span>
              <button
                onClick={() => {
                  props.removeTask(t.id, props.id);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={() => props.changeFilter("all", props.id)}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={() => props.changeFilter("active", props.id)}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={() => props.changeFilter("completed", props.id)}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
