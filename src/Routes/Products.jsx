import React, { useState, useEffect } from 'react';
import Product from '../Components/Product';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer';
import { collection, getDocs } from 'firebase/firestore';
import styles from "../Styles/Products.module.css";
import { db, auth } from '../Firebase';
import { Row, Col, Container, Button } from 'react-bootstrap';


const Products = () => {
  const [products, setProducts] = useState([]); //getting all products from the database once then using this to populate the other arrays and info
  const [displayedProducts, setDisplayedProducts] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const fetchedProducts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(fetchedProducts);
    };

    fetchProducts();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const stockProducts = products.filter((product) => product.inStock === "true");
    setDisplayedProducts(stockProducts);
    //console.log(products);
    //console.log(stockProducts);
  }, [products]);

  const handleAllProductsClick = () => {
    const stockProducts = products.filter((product) => product.inStock === "true");
    setDisplayedProducts(stockProducts);
    //console.log(products);
    //console.log(stockProducts);
  };

  const handleLuggageClick = () => {
    const luggageProducts = products.filter((product) => product.isLuggage === "true" && product.inStock === "true");
    setDisplayedProducts(luggageProducts);
    //console.log(products);
    //console.log(luggageProducts);
  };

  const handleClothingClick = () => {
    const clothingProducts = products.filter((product) => product.isClothing === "true" && product.inStock === "true");
    setDisplayedProducts(clothingProducts);
    //console.log(products);
    //console.log(clothingProducts);
  };

  return (
    <>
      <Navbar_V2 />
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
        <Row className={`gy-4 justify-content-center ${styles.productRow}`}>
          {displayedProducts.map((product) => ( //based on what displayed procuts we are using we will map the products accordingly
            <Col lg={3} md={6} sm={12} className="small-col" key={product.id}>
              <Product
                key={product.id}
                pId={product.id}
                imgs={product.imageSrc.length !== 0 ? product.imageSrc : "image not found"}
                name={product.name != null ? product.name : "Product name not found"}
                desc={product.description != null ? product.description : "description not found"}
                price={product.price != null ? product.price : "Price not found"}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Products;