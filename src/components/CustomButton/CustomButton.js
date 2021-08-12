import styles from "./CustomButton.module.css";

export default function CustomButton(props) {
	const { style } = props;
	const containerStyle = style ? `${style} ${styles.btn}` : styles.btn;

	return (
		<button onClick={props.onClick} className={containerStyle}>
			{props.children}
		</button>
	);
}
