import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { db, files } from '../Firebase.js';
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../Firebase';
import Navbar_V2 from '../Components/Navbar_V2';
import Footer from '../Components/Footer';
import { Button, Modal } from 'react-bootstrap';
import '../Styles/AddProduct.css'

export default function AddFlyerRoute() {
    var out = <></>;
    const [image, setImage] = useState(null);
    const [archive, setArchive] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user

    function addFlyerToFirestore(image, archive) {

        const flyersRef = collection(db, "flyers"); // get collection from db ref
        const flyersStorageRef = ref(files, "Images/Flyers"); // getStorage get Path
        const timestamp = new Date().getTime(); //timestamp to create unique name for image file each time

        // console.log('images array passed in function is below')
        // console.log(images); //debug
        // console.log('images array passed in function is below')

        // Upload images to Firebase Storage

        const imageName = `Flyer_${timestamp}`; //index to create a new name for each photo being uploaded

        const imageRef = ref(flyersStorageRef, imageName); //get image storage and create name for product

        let uploadPromises = uploadBytes(imageRef, image).then((snapshot) => { //upload image to imageRefrence
            return getDownloadURL(snapshot.ref); //return downloadurl array to be used in promise function 
        });

        console.log(uploadPromises)

        uploadPromises.then((downloadURLs) => { //uploadPromises is array holding all download urls

            //console.log(downloadURLs);

            // Add product document to Firestore with image URLs
            setDoc(doc(flyersRef), {
                imageSrc: downloadURLs,
                archive: archive
            })
                .then(() => {
                    // Reset fields if function succeeded
                    setArchive('');
                    setImage(null)
                    console.log("Product added successfully");
                })
                .catch((error) => {
                    console.error("Error adding product: ", error);
                });
        }).catch((error) => {
            console.error("Error uploading images: ", error);
        });
    }


    const handleImageChange = (event) => {
            console.log(event.target.files[0])
            setImage(event.target.files[0]); 

    };


    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(image)
        addFlyerToFirestore(image, archive);

    };

    function handleCloseModal() {
        setShowModal(false);
        setIsCompleted(false);
    }



    useEffect(() => { //using useEffect so when component rerenders based on auth state it will reflect on the site
        const unsubscribe = auth.onAuthStateChanged(user => { //checking auth state always from firebase
            setCurrentUser(user);
        });

        return () => {
            unsubscribe();
        };

    }, []);

    if (!currentUser) {

        out = <>Route Not Found</>

    }

    if (currentUser) {

        out =
            <>
                <Navbar_V2 />
                <div className='formContainer'>
                    <form onSubmit={handleSubmit}>
                        <label className='formItem' htmlFor='image'>Image:</label>
                        <input type='file' id='image' onChange={handleImageChange} required />
                        <br />
                        <br />

                        <label className='formItem'><u>Archived?:</u></label>
                        <input type='radio' id='archivedTrue' name='archived' value={false} onChange={(e) => setArchive(e.target.value)} required />
                        {'   '}
                        <label htmlFor='inStockTrue'>Yes</label>
                        <br />
                        {'   '}
                        <input type='radio' id='archivedFalse' name='archived' value={true} onChange={(e) => setArchive(e.target.value)} />
                        {'   '}
                        <label htmlFor='inStockFalse'>No </label>
                        <br />
                        <br />
                        <Button className='success' type='submit'>Add Flyer</Button>
                    </form>
                    <Modal show={showModal} onHide={handleCloseModal} centered className='addmodal'>
                        <Modal.Header closeButton>
                            <Modal.Title>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>The product has been added successfully!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Link to='/editProducts'>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Link>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Footer />
            </>

    }

    return (
        out
    )
}
