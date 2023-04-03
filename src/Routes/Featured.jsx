import { useState } from 'react'                        
import Navbar from '../Components/Navbar.jsx'
import Flyer from '../Components/Flyer.jsx'
import Footer from '../Components/Footer.jsx'
import Item from '../Components/Item'

function Featured() {
  return (
	<>
        <Navbar/>
        <Item logo="./src/Images/Hardshell_24inch.jpg" description="$39.99 - 24 inch"/>
        <div className='Flyers'>
          <Flyer logo="./src/Images/Flyer_3.jpg"></Flyer>
          <Flyer logo="./src/Images/Flyer_5.jpg"></Flyer>
          <Flyer logo="./src/Images/Flyer_6.jpg"></Flyer>
          <Flyer logo="./src/Images/Flyer_2.jpg"></Flyer>
          <Flyer logo="./src/Images/Flyer_4.jpg"></Flyer>
        </div>
        <Footer/>
    </>
  );
}

export default Featured
