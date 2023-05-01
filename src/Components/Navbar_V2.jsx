import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import '../Styles/Navbar_V2.css'
import { auth } from '../Firebase';
import { Navbar } from 'react-bootstrap';

function Navbar_V2() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleSignOut = (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      console.log(auth.currentUser)
    }
    else {
      console.log("No one is signed in right now")
    }
    auth.signOut()
      .then(() => {
        console.log("Signed out!");
      })
      .catch((error) => {
        console.log("Error")
        console.log(error);
      });
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("There currently is a user signed in with the email: ")
        console.log(user.email)
        setAuthUser(user)
      }
      else {
        console.log("There currently is no one signed in right now.")
        setAuthUser(null)
      }
    })
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <Navbar sticky='top' className='navbar navbar-fixed-top'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Zam Zam B&B
            <i className="fa-solid fa-person-walking-luggage fa-shake"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          {auth.currentUser ? (
            <div className="logout">
              <button onClick={handleSignOut}>LogOut</button>
            </div>
          ) : (
            ""
          )}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {auth.currentUser ? (
              <li>
                <Link to='/adminRoute' className='nav-links' onClick={closeMobileMenu}>
                  Admin
                </Link>
              </li>
            ) : (
              ""
            )}
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {!auth.currentUser ? ( //if not signed in show sign in, if signed in hide.
              <li className='nav-item'>
                <Link
                  to='/signinadmin'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Sign in
                </Link>
              </li>
            ) : (
              ""
            )}
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
          </ul>
          <div className="nav-socials">
            <SocialIcon url="https://www.facebook.com/ZamZam176/" target="_blank" />
            <SocialIcon url="https://www.instagram.com/zamzam_bag_boutique/?hl=en" target="_blank" />
          </div>
          {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
      </Navbar>
    </>
  );
}

export default Navbar_V2;