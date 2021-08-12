import styles from "./CustomButton.module.css";

export default function CustomButton(props) {
	const { className } = props;
	const containerStyle = className ? `${className} ${styles.btn}` : styles.btn;

	return (
		<button onClick={props.onClick} className={containerStyle}>
			{props.children}
		</button>
	);
}
