import React from 'react';
import { MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow } from 'mdb-react-ui-kit';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { SocialIcon } from 'react-social-icons';

export default function App() {
  return (
    <MDBFooter style={{marginTop: '30px'}} className='text-center hover' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <SocialIcon url="https://www.facebook.com/ZamZam176/" target="_blank"/>
          
          <SocialIcon url="https://www.instagram.com/zamzam_bag_boutique/?hl=en" target="_blank"/>
        </section>

        <section className=''>
          <MDBRow className='justify-content-center'>
            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Zam Zam Bags & Boutique</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <span>
                    Where network is our net-worth
                  </span>
                </li>
                <li>
                  <span>
                    Allow us to assist all your travel needs under one roof! 
                  </span>
                </li>
                
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Contact Us!</h5>
              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='mailto:zamzam630@hotmail.com' className='text-white'>
                    EMAIL
                  </a>
                </li>
                <li>
                  416-817-6849
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Visit our Facebook and Instagram!
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <span>© 2023:</span>
        <a className='text-white' href='/'>
          <span> Zam Zam Bags & Boutique</span>
        </a>
      </div>
    </MDBFooter>
  );
}