import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { db, auth } from '../Firebase';
import { Link } from 'react-router-dom';
import EditProduct from '../Components/EditProduct';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer'
import '../Styles/EditProduct.css'



export default function EditProductsRoute() {

    const [products, setProducts] = useState([]); //get products from database
    const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user
    const [displayedProducts, setDisplayedProducts] = useState([]);


    var out = <></>;

    useEffect(() => { //using useEffect so when component rerenders based on auth state it will reflect on the site
        const unsubscribe = auth.onAuthStateChanged(user => { //checking auth state always from firebase
            setCurrentUser(user);
        });

        if (currentUser) {

            const fetchProducts = async () => {
                const querySnapshot = await getDocs(collection(db, 'products'));
                setProducts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            };
            fetchProducts();

        }

        return () => {
            unsubscribe();
        };

    }, [currentUser]); //putting currentUser in dependancy array to make sure were always checking its value

    useEffect(() => {
        setDisplayedProducts(products);
        //console.log(products);
        //console.log(stockProducts);
    }, [products]);

    const handleAllProductsClick = () => {
        setDisplayedProducts(products);
        //console.log(products);
        //console.log(stockProducts);
    };

    const handleLuggageClick = () => {
        const luggageProducts = products.filter((product) => product.isLuggage === "true");
        setDisplayedProducts(luggageProducts);
        //console.log(products);
        //console.log(luggageProducts);
    };

    const handleClothingClick = () => {
        const clothingProducts = products.filter((product) => product.isClothing === "true");
        setDisplayedProducts(clothingProducts);
        //console.log(products);
        //console.log(clothingProducts);
    };

    if (!currentUser) {

        out = <>Route Not Found</>; //if not auth output variable will display thig

    }

    if (currentUser) { //if auth generate content



        out =
            <>
                <Navbar_V2 />
                <br />
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Link to="/addProduct">
                        <Button variant="success" className="addButton mx-auto">
                            ADD NEW PRODUCT
                        </Button>
                    </Link>
                </div>
                <br />
                <div className="text-center">
                    <h2>Search By:</h2>
                    <Button className="rounded-pill mx-2" onClick={handleAllProductsClick}>
                        All Products
                    </Button>
                    <Button className="rounded-pill mx-2" onClick={handleLuggageClick}>
                        Luggage
                    </Button>
                    <Button className="rounded-pill mx-2" onClick={handleClothingClick}>
                        Clothing
                    </Button>
                </div>
                <Container className="my-5">
                    <Row className="gy-4 justify-content-center">
                        {displayedProducts.map((product) => (
                            <Col lg={3} key={product.id}>
                                {/* {console.log(product.id)} */}
                                <EditProduct
                                    pId={product.id}
                                    imgs={product.imageSrc.length != 0 ? product.imageSrc : "image not found"}
                                    name={product.name != null ? product.name : "Product name not found"}
                                    desc={product.description != null ? product.description : "description not found"}
                                    price={product.price != null ? product.price : "Price not found"}
                                    inStock={product.inStock != null ? product.inStock : false}
                                    isLuggage={product.isLuggage != null ? product.isLuggage : false}
                                    isClothing={product.isClothing != null ? product.isClothing : false}
                                    isBestSeller={product.isBestSeller != null ? product.isBestSeller : false}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
                <br />
                <Footer />
            </>
    }

    return (
        out
    );

}


