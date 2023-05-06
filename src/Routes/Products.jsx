import React, { useState, useEffect } from 'react';
import Product from '../Components/Product';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer'
import { collection, getDocs } from 'firebase/firestore';
import styles from "../Styles/Products.module.css"
import { db, auth } from '../Firebase';
import { Row, Col, Container } from 'react-bootstrap';


const Products = () => {
    const [products, setProducts] = useState([]); //get products from database
    const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user


    var out = <></>;

    useEffect(() => { //using useEffect so when component rerenders based on auth state it will reflect on the site

        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            setProducts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        
        fetchProducts();

        const unsubscribe = auth.onAuthStateChanged(user => { //checking auth state always from firebase
            setCurrentUser(user);
        });

        return () => {
            unsubscribe();
        };


    }, [currentUser]);

    out =
        <>
            <Navbar_V2 />
            <br />
            <Container className="my-5">
                <Row className="gy-4 justify-content-center">
                    {products.map((product) => (
                        <Col lg={3} key={product.id}>
                            <Product
                                pId={product.id}
                                imgs={product.imageSrc.length != 0 ? product.imageSrc : "image not found"}
                                name={product.name != null ? product.name : "Product name not found"}
                                desc={product.description != null ? product.description : "description not found"}
                                price={product.price != null ? product.price : "Price not found"}
                                
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <br />
            <Footer />
        </>

    return (
        out
    );
};

export default Products;




