import '../Styles/App.css'
import Navbar_V2 from '../Components/Navbar_V2.jsx'
import Flyer from '../Components/Flyer.jsx'
import Footer from '../Components/Footer.jsx'
import Information from '../Components/Information'
import Product from '../Components/Product'
import { useEffect } from 'react'
import { useState } from 'react'
import { auth } from '../Firebase'
import { updateFlyers, updateOther } from '../Firebase'
import { Card, Modal, Button } from "react-bootstrap"


function App() {

  //Get user stuff
  const [authUser, setAuthUser] = useState(null);
  const [flyerURLS, setFlyerURLs] = useState([]);
  const [otherURLS, setOtherURLs] = useState([]);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const fURLs = await updateFlyers();
        const oURLS = await updateOther();
        setFlyerURLs(fURLs);
        setOtherURLs(oURLS);
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
        <br />
        <div>
          {console.log("ALL FLYER URLS AT THIS STATE IN REACT: ", flyerURLS)}
          {
            flyerURLS.length > 0 ? flyerURLS.map((url, i) => (
                <Flyer exp = "123"logo={url}></Flyer>
              )
            ) : <p className="green">Loading</p>
          }
        </div>

      </div>
      <Information logo={otherURLS.at(0)} />
      <Footer />
    </>
  );
}

export default App;
