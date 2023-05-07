import React, { useState, useEffect } from 'react';
import EditFlyer from '../Components/EditFlyer';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer'
import { collection, getDocs } from 'firebase/firestore';
import '../Styles/EditProduct.css'
import { db } from '../Firebase';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase';

export default function EditFlyerRoute() {

  const [flyers, setFlyers] = useState([]); //get products from database
  const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user

  var out = <></>;

  useEffect(() => { //using useEffect so when component rerenders based on auth state it will reflect on the site
    const unsubscribe = auth.onAuthStateChanged(user => { //checking auth state always from firebase
      setCurrentUser(user);
    });

    if (currentUser) {

      const fetchFlyers = async () => {
        const querySnapshot = await getDocs(collection(db, 'flyers'));
        setFlyers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      fetchFlyers();


    }

    return () => {
      unsubscribe();
    };

  }, [currentUser]); //putting currentUser in dependancy array to make sure were always checking its value

  if (!currentUser) {

    out = <>Route Not Found</>; //if not auth output variable will display thig

  }

  if (currentUser) { //if auth generate content
    out =
      <>
        <Navbar_V2 />
        <br />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Link to="/addFlyer">
            <Button variant="success" className="addButton mx-auto">
              ADD NEW FLYER
            </Button>
          </Link>
        </div>
        <Container className="my-5">
          <Row className="gy-4 justify-content-center">
            {flyers.length > 0 ? flyers.map((flyer) => (
              <Col lg={3} key={flyer.id}>

                <EditFlyer fId={flyer.id} logo={flyer.imgSrc}/>

              </Col>
            )) : <p className="green">Loading</p>
            }
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
