import logo from "../../assets/紐神.png";
import styles from "./Logo.module.css";

export default function Logo() {
	return (
		<div className={styles.container}>
			<img src={logo} alt="logo" className={styles.image} />
		</div>
	);
}
