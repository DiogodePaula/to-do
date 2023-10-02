import styles from "./index.module.css";
import logo from "../../assets/todo-logo.svg";

export function Header() {
	return (
		<header className={styles.header}>
			<img src={logo} alt="Logo ignite" />
		</header>
	);
}
