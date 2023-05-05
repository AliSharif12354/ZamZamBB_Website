import React from 'react'
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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

    async function handleFormSubmit(e) {
        e.preventDefault();
        const deleteValue = e.target.delete.value;
        const archiveValue = e.target.archive.value;
        const docRef = doc(db, "flyers", flyerID);

        if (deleteValue === "yes") { //Delete flyer document
            try {
                await deleteDoc(docRef);
                console.log("Flyer document successfully deleted!");
            } catch (error) {
                console.error("Error deleting flyer document: ", error);
            }
        } else { //Update archive status
            try {
                await updateDoc(docRef, {
                    archive: (archiveValue === "yes")
                });
                console.log("Flyer document successfully updated!");
            } catch (error) {
                console.error("Error updating flyer document: ", error);
            }
        }
    }
    return (
        <div className='content'>

            <Navbar_V2 />
            <h1>Edit Flyer</h1>
            {console.log(flyerData)}
            <Flyer logo={flyerData.imgSrc} />
            <form onSubmit={handleFormSubmit}>
                <br />
                <div>
                    <label>
                        <p className='inputFlyer'>Delete Flyer? </p>
                        <select style={{ minHeight: "25px" }} className='inputFlyer' name="Delete" id="delete">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        <p className='inputFlyer'>Archive status: (Invisible or not)</p>
                        <select style={{ minHeight: "25px" }} name="Archive" id="archive">s
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </label>
                </div>
                <br />
                <button type="submit">Submit</button>
            </form>
            <Footer />
        </div>
    );
}
