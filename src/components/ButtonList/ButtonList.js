import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import Button from "../Button/Button";
import data from "../../data/data";
import styles from "./ButtonList.module.css";

export default function ButtonList() {
	const [children, setChildren] = useState();

	const history = useHistory();

	useEffect(() => {
		const getChildrenFromUrl = (location) => {
			const urlId = location.pathname.substr(1);

			if (urlId === "") {
				setChildren(data.children);
				return;
			}

			for (const item of data.children) {
				if (item.id === +urlId) {
					if (item.type === "URL") {
						history.push("/");
						return;
					}

					setChildren(item.children);
					return;
				}
			}
		};
		getChildrenFromUrl(history.location);

		const unlisten = history.listen((location) => {
			getChildrenFromUrl(location);
		});

		return () => unlisten();
	}, [history]);

	// Render function for button list
	// Maps each data item to a Button
	const renderButtons = () => {
		return children.map((button) => (
			<Button item={button} key={button.id} />
		));
	};

	if (!children) {
		return null;
	}

	return <div className={styles.grid}>{renderButtons()}</div>;
}
