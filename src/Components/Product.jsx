import { Card, Modal, Button, Carousel } from "react-bootstrap"
import React, { useState } from "react";
import '../Styles/Product.css'
const Product = props => {

  var out = <></>;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const renderImages = () => {
    if (props.imgs && props.imgs.length > 0) {
      return props.imgs.map((image, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={props.name}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        )
      })
    } else {
      return (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={props.imgs != null ? props.imgs : "image not found"}
            alt={props.name}
          />
        </Carousel.Item>
      )
    }
  }

  out =
    <>
      <Card bg="dark" text="white" className="product-card" style={{ cursor: "pointer" }}>
        <Carousel interval={null}>
          {renderImages()}
        </Carousel>
        <Card.Body className="card-body" onClick={handleShowModal}>
          <Card.Title className="text-center">
            <h2 className="card-title">{props.name != null ? props.name : "Product name not found"}</h2>
          </Card.Title>
          <p className="card-description">
            {props.desc != null ?
              (props.desc.length > 50 ? props.desc.slice(0, 50) + "... click for more info!" : props.desc)
              : "Product description not found"}
          </p>
          <p className="text-center card-price"><strong>{props.price != null ? "$" + props.price : "Price not found"}</strong></p>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Carousel>
            {renderImages()}
          </Carousel>
          <p className="card-description">{props.desc != null ? props.desc : "Product description not found"}</p>
          <p className="text-center card-price"><strong>{props.price != null ? "$" + props.price : "Price not found"}</strong></p>
          <p className="card-description">For Most Accurate Stocking Information, <br /> Please Contact Us by Phone or Email</p>
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