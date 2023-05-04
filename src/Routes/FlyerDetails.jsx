import React from 'react'
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import Flyer from '../Components/Flyer';
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
        console.log(e)
    }
    return (
        <div>
            <h1>Edit Flyer</h1>
            {console.log(flyerData)}
            <Flyer logo={flyerData.imgSrc} />
            <p>{flyerData.description}</p>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>
                        <input type="radio" value="delete" />
                        Delete
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" value="archive"/>
                        Archive
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
