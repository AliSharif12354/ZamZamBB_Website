import { useRef } from "react";
import "../Styles/Flyer.module.css";

function Flyer(props) {
	return (
		
		<img className="img-fluid hover-shadow" src={props.logo} alt="Image not found"/> 

	);
}

export default Flyer;