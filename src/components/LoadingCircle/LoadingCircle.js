import loadingCircle from "../../assets/loading-circle.gif";
import styles from "./LoadingCircle.module.css";

export default function LoadingCircle(props) {
	return <img src={loadingCircle} alt="Loading" className={styles.img} />;
}
