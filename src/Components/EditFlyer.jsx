import { useState } from "react";
import React from "react";
import { Card, Modal, Button } from "react-bootstrap";

export default function EditFlyer(props) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleEditFlyerClick = () => {
    console.log("Edit Flyer clicked");
    window.location.href =  `/flyerDetails/${props.fId}`
  }

 
  let out = <></>;
  console.log(props.fId)


  out = (
    <>

      <Card bg="dark" text="white" className="editflyer-card" onClick={handleShowModal} style={{ cursor: "pointer" }}>
        <Card.Img src={props.logo != null ? props.logo : "image not found"} alt={props.name} />
        <Button variant='danger' className='delete-button' onClick={(e) => { e.stopPropagation(); handleEditFlyerClick() }}>Edit Flyer</Button>
      </Card>
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
