import styles from "./list.module.css";
import { BsTrash3 } from "react-icons/bs";
import { BsCheckSquare } from "react-icons/bs";
import { TbClipboardText } from "react-icons/Tb";

const Task = ({ task = {}, onComplete = () => { }, onRemoveTask = () => { } }) => {
    return (
        <div className={styles.list}>
            <button
                className={styles.checkbox}
                onClick={() => onComplete(task.id, task.is_completed)}>
                {task.is_completed ? <BsCheckSquare size={24} color='blue' /> : <div />}
            </button>
            <p className={`${styles.texto} ${task.is_completed ? styles.text_complete : ""}`}>
                {task.description}
            </p>
            <button
                className={styles.delet}>
                <BsTrash3
                    onClick={() => onRemoveTask(task.id)} size={20} color='red' />
            </button>
        </div>
    )
}
export function List({ list = [], onComplete = () => { }, onRemoveTask = () => { } }) {
    return (
        <div className={styles.task}>
            {list.map((task) => (
                <Task
                    task={task}
                    key={task.id}
                    onRemoveTask={onRemoveTask}
                    onComplete={onComplete} />
            ))}

            {list.length <= 0 && (
                <section className={styles.empty}>
                    <TbClipboardText size={50} color='blue' />
                    <div>
                        <p>Você ainda não tem tarefas cadastradas</p>
                        <span>Crie suas tarfas e se organize</span>
                    </div>
                </section>
            )}
        </div>
    )
}