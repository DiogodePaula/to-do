import { ChangeEvent, FormEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import styles from "./index.module.css";

// interface FormProps {
// 	addsTask: () => [];
// }

export function Form() {
	const [newTask, setNewTask] = useState("");

	function handleAddTaskChange(event: ChangeEvent<HTMLInputElement>) {
		setNewTask(event.target.value);
		console.log(newTask);
	}

	function handleAddTask(event: FormEvent) {
		event.preventDefault();
		console.log(newTask);
	}

	return (
		<form onSubmit={handleAddTask} className={styles.form}>
			<input onChange={handleAddTaskChange} value={newTask} type="text" placeholder="Adicione um nova tarefa" />
			<button type="submit">
				Criar <PlusCircle size={23} />
			</button>
		</form>
	);
}
