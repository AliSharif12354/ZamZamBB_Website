import React, { useState, useEffect } from 'react';
import Product from '../Components/Product';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer'
import {collection, getDocs } from 'firebase/firestore';
// import styles from "../Styles/Products.module.css"
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
            <div className="products">
                {products.map((product) => (
                    console.log(product.imageSrc)
                    <Product
                        // key={product.id}
                        logo={product.imageSrc}
                        name={product.name}
                        desc={product.description}
                        price={"$" + product.price}
                    />
                ))}
            </div>
            <Footer/>
        </>
    );
};

export default Products;