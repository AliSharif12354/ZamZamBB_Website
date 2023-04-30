import React from 'react'
import Navbar_V2 from './Navbar_V2';
import Footer from '../Components/Footer';
import '../Styles/AdminRoute.css';
import { Button } from 'react-bootstrap';
import { auth } from '../Firebase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {


    let out = <></>; //variable to append output to
    console.log("this is: " + auth.currentUser) //debug

    const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user

    useEffect(() => { //using useEffect so when component rerenders based on auth state it will reflect on the site
        const unsubscribe = auth.onAuthStateChanged(user => { //checking auth state always from firebase
            setCurrentUser(user);
        });

        return () => {
            unsubscribe();
        };

    }, []);

    if (!currentUser) {

        out = <>Route Not Found</>; //if not auth output variable will display thig

    }

    if (currentUser) {

        out = //if auth confirmed then variable will hold this html 
            <>
                <Navbar_V2 />
                <div style={{ width: '100%', height: '80vh' }}>
                    <div className='flyerDiv'>

                        <div className='buttonDiv'>
                            <Link to='/editFlyers'>
                                <Button variant='success' style={{ fontSize: '60px', padding: '10px 20px' }}>
                                    Edit Flyers
                                </Button>
                            </Link>
                        </div>

                    </div>
                    <div className='productsDiv'>
                        <div className='buttonDiv'>
                            <Link to='/editProducts'>
                                <Button variant='success' style={{ fontSize: '60px', padding: '10px 20px' }}>
                                    Edit Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
            
    }

    return (
        out
    )

}
