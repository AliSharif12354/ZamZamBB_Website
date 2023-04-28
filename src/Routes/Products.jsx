import React, { useState, useEffect } from 'react';
import Product from '../Components/Product';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer'
import {collection, getDocs } from 'firebase/firestore';
import styles from "../Styles/Products.module.css"
import { db } from '../Firebase';

const Products = () => {
    const [products, setProducts] = useState([]);
    var out = <></>;

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            setProducts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchProducts();
    }, []);

    out = 
    <>
        <Navbar_V2/>
        <div className={styles.products}>
            {products.map((product) => (
                <Product
                    key={product.id}
                    logo={product.imageSrc}
                    name={product.name}
                    desc={product.description}
                    price={"$" + product.price}
                />
            ))}
        </div>
        <Footer/>
    </>

    return (
        out
    );
};

export default Products;