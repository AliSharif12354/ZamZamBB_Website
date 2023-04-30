import React, { useState, useEffect } from 'react';
import Product from '../Components/Product';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer'
import {collection, getDocs } from 'firebase/firestore';
import styles from "../Styles/Products.module.css"
import { db } from '../Firebase';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            setProducts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchProducts();
    }, []);

    return (
        <>
            <Navbar_V2/>
            <div className={styles.products}>
                {products.map((product) => (
                    <Product
                        key={product.id != null ? product.id : "Id not found"}
                        logo={product.imageSrc != null ? product.imageSrc : "image not found"}
                        name={product.name != null ? product.name : "Product name not found"}
                        desc={product.description != null ? 
                            (product.description.length > 50 ? product.description.slice(0, 50) + "..." : product.description) 
                            : "Product description not found"}
                        price={product.price != null ? "$" + product.price : "Price not found" }
                    />
                ))}
                
            </div>
            <Footer/>
        </>
    );
};

export default Products;