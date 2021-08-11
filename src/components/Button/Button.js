import { useHistory } from "react-router";

import styles from "./Button.module.css";

export default function Button(props) {
	const history = useHistory();

	// Handler for when a button is clicked
	const clickHandler = async () => {
		// If item is a category, navigate to a new ButtonList screen
		if (props.item.type === "CATEGORY") {
			history.push(`/${props.item.id}`);
			return;
		}

		// If item is a link, open link in a new tab
		window.open(props.item.url, "_blank");
	};

	// return <p onClick={clickHandler}>{props.item.id}</p>;
	return (
		<div onClick={clickHandler}>
			<img src={props.item.image} alt={props.item.name} className={styles.image} />
			<p>{props.item.name}</p>
		</div>
	);
}
