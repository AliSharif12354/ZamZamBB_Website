import { useRef, useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";

function Flyer(props) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  let out = <></>;

  out = (
    <>
      <img
        className="img-fluid hover-shadow"
        onClick={handleShowModal}
        style={{ cursor: "pointer", padding: 0 }}
        src={props.logo}
        alt="Image not found"
      />
      {console.log("URL OF THIS FLYER: ", props.logo)}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body className="text-center p-0">
          <img
            src={props.logo != null ? props.logo : "image not found"}
            alt="Flyer not found"
            className="w-100 h-100"
            style={{ objectFit: "contain" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );

  return out;
}

export default Flyer;

