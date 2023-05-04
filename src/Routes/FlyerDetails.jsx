import React from 'react'
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import Flyer from '../Components/Flyer';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer'
import "../Styles/FlyerDetails.css"
export default function FlyerDetails(props) {

    const { flyerID } = useParams();
    const [flyerData, setFlyerData] = useState(null);

    useEffect(() => { //Get flyer document
        const fetchFlyerDetails = async () => {
            const docRef = doc(db, "flyers", flyerID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFlyerData(docSnap.data());
            } else {
                console.log("No such document exists!");
            }
        };
        fetchFlyerDetails();
    }, [db, flyerID]);

    if (!flyerData) { //Means we are searching for flyer document details as flyer document is empty at the moment
        return <div>Loading...</div>;
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        console.log(e)
    }
    return (
        <div className='content'>
            
            <Navbar_V2 />
            <h1>Edit Flyer</h1>
            {console.log(flyerData)}
            <Flyer logo={flyerData.imgSrc} />
            <form onSubmit={handleFormSubmit}>
                <br/>
                <div>
                    <label>
                    <p className='inputFlyer'>Delete Flyer? </p>
                        <select style={{minHeight: "25px"}} className='inputFlyer' name="Delete" id="delete">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </label>
                </div>
                <br/>
                <div>
                    <label>
                        <p className='inputFlyer'>Archive status: (Invisible or not)</p>
                        <select style={{minHeight: "25px"}} name="Archive" id="archive">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </label>
                </div>
                <br/>   
                <button type="submit">Submit</button>
            </form>
            <Footer />
        </div>
    );
}
