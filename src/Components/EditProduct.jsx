import { Card, Form, Button } from "react-bootstrap"
import React, { useState, useEffect } from 'react';
import { auth } from "../Firebase";
import Navbar_V2 from "./Navbar_V2";
import Footer from "./Footer";
import styles from '../Styles/Product.module.css';


const EditProduct = props => {

    var out = <></>;

    out = <div className={styles.product}>
        <Card >
            <Card.Img src={props.logo} alt={props.name} />
            <Card.Title>
                <h2>{props.name}</h2>
            </Card.Title>
            <Card.Text>
                <br />
                <p>{props.desc}</p>
                <p><strong>{props.price}</strong></p>
            </Card.Text>
            <Button variant='danger'>Delete Product</Button>
        </Card>
    </div>

    return (
        <>
        {out} 
        </>
    );

};

export default EditProduct;