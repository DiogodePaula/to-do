import { ClipboardText } from "phosphor-react";
import styles from "./index.module.css";

export function EmptyTask() {
	return (
		<div className={styles.emptyTaskContainer}>
			<ClipboardText size={56} />
			<strong>Você ainda não tem tarefas cadastradas</strong>
			<p>Crie tarefas e organize seus itens a fazer</p>
		</div>
	);
}
