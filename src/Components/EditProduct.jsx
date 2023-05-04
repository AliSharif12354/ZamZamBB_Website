import { Card, Modal, Button, Carousel } from "react-bootstrap"
import React, { useState, useEffect } from 'react';
import { auth } from "../Firebase";
import '../Styles/EditProduct.css'

const EditProduct = props => {

    var out = <></>;
    const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => { //using useEffect so when component rerenders based on auth state it will reflect on the site
        const unsubscribe = auth.onAuthStateChanged(user => { //checking auth state always from firebase
            setCurrentUser(user);
        });

        return () => {
            unsubscribe();
        };

    }, []);


    if (!currentUser) {

        out = <>Route Not Found</>; //if not auth output variable will display thig

    }

    if (currentUser) {

        //console.log(props.pId);
        const handleEditProductClick = () => {
            console.log("Edit Product clicked");
        }

        const handleNoInventoryClick = () => {
            console.log("No Inventory clicked");
        }

        const renderImages = () => {
            if (props.imgs && props.imgs.length > 0) {
                return props.imgs.map((image, index) => {
                    return (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt={props.name}
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
                <Card bg="dark" text="white" className="editproduct-card" style={{ cursor: "pointer" }}>
                    <Carousel interval={null}>
                        {renderImages()}
                    </Carousel>
                    <Card.Body onClick={handleShowModal}>
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
                        <Button variant='danger' className='delete-button' onClick={(e) => { e.stopPropagation(); handleEditProductClick() }}>Edit Product</Button>
                        <Button variant='warning' className='soldout-button' onClick={(e) => { e.stopPropagation(); handleNoInventoryClick() }}>No Inventory</Button>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal} className="mx-auto">Close</Button>
                    </Modal.Footer>
                </Modal>


            </>


    }


    return (
        <>
            {out}
        </>
    );

};

export default EditProduct;

