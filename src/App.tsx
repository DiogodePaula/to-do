import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

import styles from "./App.module.css";

import { Header } from "./components/Header";
import { Task, TaskProps } from "./components/Task";
import { EmptyTask } from "./components/EmptyTask";

export interface TaskCompletedChangeProps {
	id: string;
	done: boolean;
}

export function App() {
	const [tasks, setTask] = useState<TaskProps[]>([]);
	const [newTask, setNewTask] = useState("");
	const [countTaskCreated, setCountTaskCreated] = useState(0);
	const [countTaskCompleted, setCountTaskCompleted] = useState(0);
	const id = uuidv4();

	function handleAddTaskChange(event: ChangeEvent<HTMLInputElement>) {
		setNewTask(event.target.value);
	}

	function handleAddTask(event: FormEvent) {
		event.preventDefault();

		setTask((prevTasks) => {
			const updatedTasks = [...prevTasks, { id, task: newTask, done: false, onTaskCompletedChange: taskCompletedChange, onDeleteTask: deleteTask }];

			Cookies.set("tasks", JSON.stringify(updatedTasks), { expires: 30 });
			return updatedTasks;
		});

		setNewTask("");
	}

	function taskCompletedChange(taskChange: TaskCompletedChangeProps) {
		const taskUpdate = tasks.find((t) => taskChange.id == t.id);

		if (taskUpdate) {
			taskUpdate.done = taskChange.done;

			setTask((prevTasks) => {
				const updatedTasks = [...prevTasks];

				Cookies.set("tasks", JSON.stringify(updatedTasks), { expires: 30 });
				return updatedTasks;
			});
		}

		const taskCompleted = tasks.filter((task) => {
			return task.done === true;
		});
		setCountTaskCompleted(taskCompleted.length);
	}

	function deleteTask(id: string) {
		const taskWithoutDeletedOne = tasks.filter((idFilter) => {
			return idFilter.id !== id;
		});

		setTask(() => {
			const updatedTasks = [...taskWithoutDeletedOne];

			const taskCompleted = updatedTasks.filter((task) => {
				return task.done === true;
			});
			setCountTaskCompleted(taskCompleted.length);

			Cookies.set("tasks", JSON.stringify(updatedTasks), { expires: 30 });
			return updatedTasks;
		});
	}

	useEffect(() => {
		setCountTaskCreated(tasks.length);
	}, [tasks]);

	useEffect(() => {
		const obterCookie = Cookies.get("tasks");

		if (obterCookie) {
			const cookieTasks: TaskProps[] = JSON.parse(obterCookie);
			setTask(cookieTasks);

			const taskCompleted = cookieTasks.filter((task) => {
				return task.done === true;
			});
			setCountTaskCompleted(taskCompleted.length);
		}
	}, []);

	return (
		<div className={styles.container}>
			<Header />
			<main className={styles.containerForm}>
				<form onSubmit={handleAddTask} className={styles.form}>
					<input onChange={handleAddTaskChange} value={newTask} type="text" placeholder="Adicione um nova tarefa" />
					<button type="submit">
						Criar <PlusCircle size={23} />
					</button>
				</form>

				<div className={styles.containerCount}>
					<div className={styles.tasks}>
						<span className={styles.tasksCreated}>Tarefas criadas</span>
						<span>{countTaskCreated}</span>
					</div>
					<div className={styles.tasks}>
						<span className={styles.tasksCompleted}>Tarefas concluídas</span>
						<span>{countTaskCompleted}</span>
					</div>
				</div>

				{tasks.length ? (
					tasks.map((t) => {
						return (
							<div key={t.id}>
								<Task id={t.id} task={t.task} done={t.done} onDeleteTask={deleteTask} onTaskCompletedChange={taskCompletedChange} />
							</div>
						);
					})
				) : (
					<EmptyTask />
				)}
			</main>
		</div>
	);
}
