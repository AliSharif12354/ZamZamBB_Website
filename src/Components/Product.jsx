import { Form, Button } from "react-bootstrap"
import React, { useState } from "react";
import { auth } from "../Firebase";
import Navbar_V2 from "./Navbar_V2";
import Footer from "./Footer";
import styles from '../Styles/Product.module.css'

const Product = props => {
  return (
    <div className={styles.product}>
      <img src={props.logo != null ? props.logo : "image not found"} alt={props.name} />
      <br />
      <h2>{props.name != null ? props.name : "Product name not found"}</h2>
      <p>
        {props.desc != null ?
          (props.desc.length > 50 ? props.desc.slice(0, 50) + "..." : props.desc)
          : "Product description not found"}
      </p>
      <p>{props.price != null ? "$" + props.price : "Price not found" }</p>
    </div>
  );
};

export default Product;