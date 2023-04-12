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
import { updateFlyers } from '../Firebase'



function App() {

  //Get user stuff
  const [authUser, setAuthUser] = useState(null);
  // const Flyers = ref(files, "Images/Flyers/");
  const [flyerURLS, setFlyerURLs] = useState([]);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const URLs = await updateFlyers();
        setFlyerURLs(URLs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  //Use effect for signed in or not
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

  const populateFlyers = () => {
    const temp = [];
  }

  return (
    <>
      <Navbar_V2 />

      <div className='Flyers'>

        <h2>Our Current Flyers</h2>
        <h3>First come first serve, don't miss your chance!</h3>
        <div>
          {console.log("ALL FLYER URLS AT THIS STATE IN REACT: ", flyerURLS)}
          {
            flyerURLS.length > 0 ? flyerURLS.map((url, i) => (
                <Flyer key={i} logo={url}></Flyer>
              )
            ) : <p>Loading</p>
          }
        </div>

      </div>
      <Information logo="./src/Images/ZamZam.png" />
      <Footer />
    </>
  );
}

export default App
