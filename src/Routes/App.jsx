import '../Styles/App.css'
// import Navbar from '../Components/Navbar.jsx'
import Navbar_V2 from '../Components/Navbar_V2.jsx'
import Flyer from '../Components/Flyer.jsx'
// import Flyers from '../Components/Flyers.jsx'
import Footer from '../Components/Footer.jsx'
import Information from '../Components/Information'
import SignIn from '../Components/Auth/SignIn'
import SignUp from '../Components/Auth/SignUp'



function App() {
  return (
			<>
        <Navbar_V2/>
        {/* <SignIn/>
        <SignUp/> */}
        {/* <Flyers flyers={[
          {logo: "./src/Images/Flyer_1.jpg"}, 
          {logo: "./src/Images/Flyer_2.jpg"}, 
          {logo: "./src/Images/Flyer_3.jpg"}, 
          {logo: "./src/Images/Flyer_4.jpg"}, 
          {logo: "./src/Images/Flyer_5.jpg"}, 
          {logo: "./src/Images/Flyer_6.jpg"}, ]}></Flyers> */}
        <div className='Flyers'>
          <h2>Our Current Flyers</h2>
          <h3>The best for less, first come first serve, don't miss your chance!</h3>
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
