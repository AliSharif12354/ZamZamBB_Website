import { useRef, useState } from "react";
import "../Styles/Flyer.module.css";
import { Card, Modal, Button } from "react-bootstrap"

function Flyer(props) {
	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	let out = <></>

	out = (
		<>
			<img className="img-fluid hover-shadow" onClick={handleShowModal} style={{ cursor: "pointer" }} src={props.logo} alt="Image not found" />
			{console.log("URL OF THIS FLYER: ", props.logo)}

			<Modal show={showModal} onHide={handleCloseModal} >
				<Modal.Body className="text-center">
					<img src={props.logo != null ? props.logo : "image not found"} alt="Flyer not found" />
					{/* <p className="card-description">{props.desc != null ? props.desc : "Product description not found"}</p> */}
				</Modal.Body>
			</Modal>
		</>
	);

	return (
		out
	);
}

export default Flyer;