import { useState } from 'react'
import '../Styles/App.css'
import Navbar from '../Components/Navbar.jsx'
import Flyer from '../Components/Flyer.jsx'
import Flyers from '../Components/Flyers.jsx'
import Footer from '../Components/Footer.jsx'
import Information from '../Components/Information'

function App() {
  return (
			<>
        <Navbar/>
        {/* <Flyers flyers={[
          {logo: "./src/Images/Flyer_1.jpg"}, 
          {logo: "./src/Images/Flyer_2.jpg"}, 
          {logo: "./src/Images/Flyer_3.jpg"}, 
          {logo: "./src/Images/Flyer_4.jpg"}, 
          {logo: "./src/Images/Flyer_5.jpg"}, 
          {logo: "./src/Images/Flyer_6.jpg"}, ]}></Flyers> */}
        <div className='Flyers'>
          <Flyer logo="./src/Images/Flyer_1.jpg"></Flyer>
          <Flyer logo="./src/Images/Flyer_3.jpg"></Flyer>
          <Flyer logo="./src/Images/Flyer_5.jpg"></Flyer>
          <Flyer logo="./src/Images/Flyer_6.jpg"></Flyer>
          <Flyer logo="./src/Images/Flyer_2.jpg"></Flyer>
          <Flyer logo="./src/Images/Flyer_4.jpg"></Flyer>
        </div>
        <Information logo="./src/Images/ZamZam.png"/>
        <Footer/>
      </>
  );
}

export default App
