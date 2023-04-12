import '../Styles/App.css'
// import Navbar from '../Components/Navbar.jsx'
import Flyer from '../Components/Flyer.jsx'
// import Flyers from '../Components/Flyers.jsx'
// import SignIn from '../Components/Auth/SignIn'
// import SignUp from '../Components/Auth/SignUp'
import { files, flyerURLS } from '../Firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'



function Flyers() {

  return (
    <>
        <div id='Flyers' onLoad={flyersLoad}>
          {console.log("ARRAY: ", flyerURLS)}
          {
          flyerURLS.map(url => {
            <Flyer logo={url}></Flyer>;
          })
          }
        </div>
    </>
  );
}

export default Flyers
