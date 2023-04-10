import '../Styles/App.css'
// import Navbar from '../Components/Navbar.jsx'
import Navbar_V2 from '../Components/Navbar_V2.jsx'
import Flyer from '../Components/Flyer.jsx'
// import Flyers from '../Components/Flyers.jsx'
import Footer from '../Components/Footer.jsx'
import Information from '../Components/Information'
// import SignIn from '../Components/Auth/SignIn'
// import SignUp from '../Components/Auth/SignUp'
import { useEffect } from 'react'
import { useState } from 'react'
import { auth } from '../Firebase'
import { files } from '../Firebase'
import { ref, listAll } from 'firebase/storage'



function App() {

  //Get user stuff
  const [authUser, setAuthUser] = useState(null);
  const Flyers = ref(files, "Images/Flyers/");

  useEffect(() => {
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
  }, [])

  return (
    <>
      <Navbar_V2 />
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
        <h3>First come first serve, don't miss your chance!</h3>
        <Flyer logo="./src/Images/Flyer_1.jpg"></Flyer>
        <Flyer logo="./src/Images/Flyer_3.jpg"></Flyer>
        <Flyer logo="./src/Images/Flyer_5.jpg"></Flyer>
        <Flyer logo="./src/Images/Flyer_6.jpg"></Flyer>
        <Flyer logo="./src/Images/Flyer_2.jpg"></Flyer>
        <Flyer logo="./src/Images/Flyer_4.jpg"></Flyer>
      </div>
      <Information logo="./src/Images/ZamZam.png" />
      <Footer />
    </>
  );
}

export default App
