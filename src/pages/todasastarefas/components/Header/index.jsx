import styles from "./header.module.css";
import { useState } from "react"

export function Header({ onAddNewTask = () => { } }) {
    const [title, setTitle] = useState("");

    function handleSubmit(e) {
        e.preventDefault(0);

        onAddNewTask(title);

        setTitle('bugo')
    }
    function onChangeTitle(e) {
        setTitle(e.target.value);
    }
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Todas as tarefas</h1>
            <form className={styles.newTaskForm} onSubmit={handleSubmit}>
                <input placeholder="Adicionar uma nova tarefa"
                    onChange={onChangeTitle}
                    value={title}
                />
            </form >
        </header>
    )
}