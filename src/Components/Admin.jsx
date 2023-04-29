import React from 'react'
import Navbar_V2 from './Navbar_V2';
import Footer from '../Components/Footer';
import '../Styles/AdminRoute.css'
import { Button } from 'react-bootstrap'



export default function Admin() {

    var out = <></>;

    out =
        <>
            <Navbar_V2 />
            <div style={{ width: '100%', height: '80vh' }}>
                <div className='flyerDiv'>

                    <div className='buttonDiv'>
                        <Button variant='success' style={{ fontSize: '60px', padding: '10px 20px' }}>
                            Edit Flyers
                        </Button>
                    </div>

                </div>
                <div className='productsDiv'>
                    <div className='buttonDiv'>
                        <Button variant='success' style={{ fontSize: '60px', padding: '10px 20px' }}>
                            Edit Products
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    return (
        out
    )

}
