import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { List } from "./components/List";
import styles from "./conteiner.module.css";
import api from "../../services/api";

const LOCAL_STORAGE_KEY = "todosave";

export function TodasAsTarefas() {
    const [list, setList] = useState([]);

    async function loadSaveList() {
        const result = await api.get("/")
        setList(result.data.list)
        // const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        // if (saved) {
        //     setList(JSON.parse(saved));
        // }
    }

    useEffect(() => {
        loadSaveList();
    }, [])

    function setListAndSave(newTasks) {
        setList(newTasks);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    }

    async function onRemoveTask(taskForRemove) {
        const result = await api.delete("/" + taskForRemove)

        if (result.status == 200) {
            const restTasks = list.filter((item) => item.id !== taskForRemove)
            setListAndSave(restTasks)
        }
    }
    async function onAddNewTask(description) {
        const result = await api.post("/", {
            description
        })

        if (result.status == 201) {
            setListAndSave([...list, result.data])
        }
        
    }
    async function toggleTaskCompletedById(taskId, isCompleted) {
        const result = await api.put("/" + taskId, {
            is_completed: !isCompleted
        })

        if (result.status == 200) {
            const newTasks = list.map(task => {

                if (task.id == taskId) {
                    return {
                        ...task,
                        is_completed: !isCompleted,
                    }
                }
                return task;
            })
            setListAndSave(newTasks);
        }

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