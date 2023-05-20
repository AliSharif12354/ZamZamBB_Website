import { Button } from "react-bootstrap"
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { auth, files, db } from "../Firebase";
import Flyer from '../Components/Flyer';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer'
import "../Styles/FlyerDetails.css"

export default function FlyerDetails(props) {

    const { flyerID } = useParams(); //Get flyer ID from URL
    const [flyerData, setFlyerData] = useState(null);
    const response = useRef(null) //Get the success message pointer, purely for outputting to user not for functionality
    const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user
    let out = <></>;


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => { //checking auth state always from firebase
            setCurrentUser(user);
        });

        const fetchFlyerDetails = async () => { //Get flyer document from firestore
            const docRef = doc(db, "flyers", flyerID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFlyerData(docSnap.data());
            } else {
                console.log("No such document exists!");
            }
        };
        fetchFlyerDetails();
        unsubscribe();
    }, [db, flyerID]);

    if (!flyerData) { //Means we are searching for flyer document details as flyer document is empty at the moment
        console.log(flyerData)
        return <div>Loading...</div>;
    }

    async function handleFormSubmit(e) { //Functionality for submitting changes
        e.preventDefault();
        const deleteValue = e.target.delete.value;
        const archiveValue = e.target.archive.value;
        const docRef = doc(db, "flyers", flyerID);

        if (deleteValue === "yes") { //Delete flyer document
            try {
                const docSnapshot = await getDoc(docRef);
                const flyerData = docSnapshot.data();
                const imageSrc = flyerData.imgSrc;
                const imageRef = ref(files, imageSrc);
                await deleteObject(imageRef);
                await deleteDoc(docRef);
                response.current.style.opacity = '1';
                response.innerHTML = "Flyer document successfully deleted!";
            } catch (error) {
                response.current.style.opacity = '1';
                response.innerHTML = `Error deleting flyer document: $error`;
                console.error("Error deleting flyer document: ", error);
            }
        } else { //Update archive status
            try {
                await updateDoc(docRef, {
                    archive: (archiveValue === "yes")
                });
                response.current.style.opacity = '1';
                response.innerHTML = "Flyer document successfully updated!";
            } catch (error) {
                console.log("before")
                console.log("After", response)
                response.current.style.opacity = '1';
                response.innerHTML = `Error archiving flyer document: $error`;
                console.error("Error deleting flyer document: ", error);
            }
        }
        location.href = '/#/editFlyers'
    }

    if (!currentUser) {

        out = <>Route Not Found</>

    }

    if (currentUser) {
        out =
            <>
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
                                <select style={{ minHeight: "25px" }} className='inputFlyer' name="delete" id="delete">
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

                        <Button type="submit">Submit</Button>
                        <p ref={response} style={{ opacity: "0" }}>Changes made!</p>
                    </form>
                    <Footer />

                </div>
            </>

    }
    return (
        out
    );
}
