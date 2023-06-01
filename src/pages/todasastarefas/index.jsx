import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { List } from "./components/List";
import styles from "./conteiner.module.css";

const LOCAL_STORAGE_KEY = "todosave";

export function TodasAsTarefas() {
    const [list, setList] = useState([]);

    function loadSaveList() {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            setList(JSON.parse(saved));
        }
    }

    useEffect(() => {
        loadSaveList();
    }, [])

    function setListAndSave(newTasks) {
        setList(newTasks);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    }

    function onRemoveTask(taskForRemove) {
        const restTasks = list.filter((item) => item.id !== taskForRemove)
        setListAndSave(restTasks)
    }
    function onAddNewTask(newTask) {
        setListAndSave([...list, {
            id: crypto.randomUUID(),
            title: newTask,
            is_completed: false
        }])
    }
    function toggleTaskCompletedById(taskId) {
        const newTasks = list.map(task => {
            if (task.id == taskId) {
                return {
                    ...task,
                    is_completed: !task.is_completed,
                }
            }
            return task;
        })
        setListAndSave(newTasks);
    }
    return (
        <div className={styles.container}>
            <Header onAddNewTask={onAddNewTask} />
            <List
                list={list}
                onRemoveTask={onRemoveTask}
                onComplete={toggleTaskCompletedById} />
        </div>
    )
}