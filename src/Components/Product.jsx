import { Card, Modal, Button } from "react-bootstrap"
import React, { useState } from "react";
import { auth } from "../Firebase";
import Navbar_V2 from "./Navbar_V2";
import Footer from "./Footer";
import styles from '../Styles/Product.css'
const Product = props => {

  var out = <></>;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);


  out =
    <>
      <Card bg="dark" text="white" className="product-card" onClick={handleShowModal} style={{ cursor: "pointer" }}>
        <Card.Img className="card-img" src={props.logo != null ? props.logo : "image not found"} alt={props.name} />
        <Card.Body className="card-body">
          <Card.Title className="text-center">
            <h2 className="card-title">{props.name != null ? props.name : "Product name not found"}</h2>
          </Card.Title>
          <Card.Text className="text-truncate text-center card-text">
            <p className="card-description">
              {props.desc != null ?
                (props.desc.length > 50 ? props.desc.slice(0, 50) + "..." : props.desc)
                : "Product description not found"}
            </p>
            <p className="text-center card-price"><strong>{props.price != null ? "$" + props.price : "Price not found"}</strong></p>
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={props.logo != null ? props.logo : "image not found"} alt={props.name} />
          <p className="card-description">{props.desc != null ? props.desc : "Product description not found"}</p>
          <p className="text-center card-price"><strong>{props.price != null ? "$" + props.price : "Price not found"}</strong></p>
          <p className="card-description">For Most Accurate Stocking Information, <br/> Please Contact Us by Phone or Email</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className="mx-auto">Close</Button>
        </Modal.Footer>
      </Modal>
    </>


  return (
    out
  );
};

export default Product;