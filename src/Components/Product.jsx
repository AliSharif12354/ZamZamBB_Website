import { Form, Button } from "react-bootstrap"
import React, { useState } from "react";
import { auth } from "../Firebase";
import Navbar_V2 from "./Navbar_V2";
import Footer from "./Footer";
import styles from '../Styles/Product.module.css'

const Product = props => {
    return (
      <div className={styles.product}>
        <img src={props.logo} alt={props.name} />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h2>{props.name}</h2>
        <p>{props.desc}</p>
        <p>{props.price}</p>
      </div>
    );
};

export default Product;