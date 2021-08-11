import { useHistory } from "react-router";

export default function Button(props) {
	const history = useHistory();

	// Handler for when a button is clicked
	const clickHandler = async () => {
		// If item is a category, navigate to a new ButtonList screen
		if (props.item.type === "CATEGORY") {
			history.push(`/${props.item.id}`)
			console.log("Category");
			return;
		}

		window.open(props.item.url, "_blank");
		// window.location.href = props.item.url;
		console.log(props.item.url);
	};

	return <p onClick={clickHandler}>{props.item.id}</p>;
}
