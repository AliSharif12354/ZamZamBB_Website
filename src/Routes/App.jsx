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
      <Product name="Soft side 4 wheeler luggage" logo="src\Images\Hardshell_24inch.jpg" price="$39.99" desc="- Strong soft side - aluminum handle - tsa lock" />

      <div className='Flyers'>

        <h2>Our Current Flyers</h2>
        <h3>First come first serve, don't miss your chance!</h3>
        <div>
          {console.log("ALL FLYER URLS AT THIS STATE IN REACT: ", flyerURLS)}
          {
            flyerURLS.length > 0 ? flyerURLS.map((url, i) => (
                <Flyer exp = "123"logo={url}></Flyer>
              )
            ) : <p class="green">Loading</p>
          }
        </div>

      </div>
      <Information logo={otherURLS.at(0)} />
      <Footer />
    </>
  );
}

export default App
