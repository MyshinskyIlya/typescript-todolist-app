import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist/Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};
function App() {
    // ---------------------- Hooks ---------------------

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter((t) => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({ ...tasksObj });
    }

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];

        tasksObj[todolistId] = newTasks;

        setTasks({ ...tasksObj });
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];

        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.isDone = !task.isDone;
            setTasks({ ...tasksObj });
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find((tl) => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;

            setTodoList([...todolists]);
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodoList] = useState<Array<TodolistType>>([
        { id: todolistId1, title: "What to learn", filter: "active" },
        { id: todolistId2, title: "What to buy", filter: "completed" },
    ]);

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {
                id: v1(),
                title: "CSS",
                isDone: true,
            },
            {
                id: v1(),
                title: "JS",
                isDone: true,
            },
            {
                id: v1(),
                title: "React",
                isDone: false,
            },
            {
                id: v1(),
                title: "Redux",
                isDone: false,
            },
        ],

        [todolistId2]: [
            {
                id: v1(),
                title: "Book",
                isDone: false,
            },
            {
                id: v1(),
                title: "Milk",
                isDone: true,
            },
        ],
    });

    function removeTodoList(todolistId: string) {
        let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
        setTodoList(filteredTodolist);

        delete tasksObj[todolistId];
        setTasks({ ...tasksObj });
    }
    // ------------------------ App ----------------------
    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodoList = tasksObj[tl.id];

                if (tl.filter === "completed") {
                    tasksForTodoList = tasksForTodoList.filter(
                        (t) => t.isDone == true
                    );
                }
                if (tl.filter === "active") {
                    tasksForTodoList = tasksForTodoList.filter(
                        (t) => t.isDone == false
                    );
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    ></Todolist>
                );
            })}

            <Counter></Counter>
        </div>
    );
}
// ------------------------ Components ----------------------

function Counter() {
    let arr = useState(5);

    let data = arr[0]; // 5
    let setData = arr[1];

    return <div onClick={() => setData(data + 1)}>{data}</div>;
}

export default App;
