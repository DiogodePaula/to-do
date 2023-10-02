import { Trash } from "phosphor-react";

import styles from "./index.module.css";
import { TaskCompletedChangeProps } from "../../App";

export interface TaskProps {
	id: string;
	task: string;
	done: boolean;
	onTaskCompletedChange: (taskChange: TaskCompletedChangeProps) => void;
	onDeleteTask: (id: string) => void;
}

export function Task({ id, task, done, onDeleteTask, onTaskCompletedChange }: TaskProps) {
	function handleCheckboxChange() {
		onTaskCompletedChange({ id, done: !done });
	}

	function handleDeleteTask() {
		onDeleteTask(id);
	}

	return (
		<div className={styles.taskContainer}>
			<label className={styles.checkboxContainer}>
				<input type="checkbox" checked={done} onChange={handleCheckboxChange} />
				<span className={styles.checkmark}></span>
			</label>
			<div className={styles.content}>
				<p className={done ? styles.textoRiscado : ""}>{task}</p>
			</div>
			<Trash onClick={handleDeleteTask} size={20} className={styles.icon} />
		</div>
	);
}
