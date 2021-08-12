import styles from "./Input.module.css";

export default function Input(props) {
	const { style, placeholder, type, value, onChange } = props;
	const finalStyle = `${style} ${styles.input}`;

	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			className={finalStyle}
			placeholder={placeholder}
			autoCapitalize="none"
		/>
	);
}
