import { Card, Form, Button } from "react-bootstrap"
import React, { useState, useEffect } from 'react';
import { auth } from "../Firebase";
import Navbar_V2 from "./Navbar_V2";
import Footer from "./Footer";
import styles from '../Styles/Product.module.css';


const EditProduct = props => {

    var out = <></>;

    out = 
        <Card bg="info" text="white">
            <Card.Img src={props.logo != null ? props.logo : "image not found"} alt={props.name} />
            <Card.Title>
                <h2>{props.name != null ? props.name : "Product name not found"}</h2>
            </Card.Title>
            <Card.Text>
                <br />
                <p>
                    {props.desc != null ?
                    (props.desc.length > 50 ? props.desc.slice(0, 50) + "..." : props.desc)
                    : "Product description not found"}
                </p>
                <p><strong>{props.price != null ? "$" + props.price : "Price not found" }</strong></p>
            </Card.Text>
            <Button variant='danger'>Delete Product</Button>
        </Card>
   

    return (
        <>
            {out}
        </>
    );

};

export default EditProduct;