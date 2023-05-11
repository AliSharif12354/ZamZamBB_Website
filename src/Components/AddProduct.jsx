import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { db, files } from '../Firebase.js';
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../Firebase';
import Navbar_V2 from './Navbar_V2';
import Footer from '../Components/Footer';
import { Button, Modal } from 'react-bootstrap';
import '../Styles/AddProduct.css'

export default function AddProduct() {

    var out = <></>;
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState(false);
    const [isLuggage, setIsLuggage] = useState(false);
    const [isClothing, setIsClothing] = useState(false);
    const [isBestSeller, setIsBestSeller] = useState(false);
    //const [isCompleted, setIsCompleted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user

    function addProductToFirestore(images, name, description, price, inStock, isLuggage, isClothing, isBestSeller) {

        const productsRef = collection(db, "products"); // get collection from db ref
        const itemsRef = ref(files, "Images/Items"); // getStorage get Path
        const timestamp = new Date().getTime(); //timestamp to create unique name for image file each time

        // console.log('images array passed in function is below')
        // console.log(images); //debug
        // console.log('images array passed in function is below')

        // Upload images to Firebase Storage
        const uploadPromises = images.map((image, index) => {

            const imageName = `${name}_${timestamp}_${index}`; //index to create a new name for each photo being uploaded

            const imageRef = ref(itemsRef, imageName); //get image storage and create name for product

            return uploadBytes(imageRef, image).then((snapshot) => { //upload image to imageRefrence
                return getDownloadURL(snapshot.ref); //return downloadurl array to be used in promise function 
            });

        });


        Promise.all(uploadPromises).then((downloadURLs) => { //uploadPromises is array holding all download urls

            //console.log(downloadURLs);

            // Add product document to Firestore with image URLs
            setDoc(doc(productsRef), {
                imageSrc: downloadURLs,
                name: name,
                description: description,
                price: price,
                inStock: inStock,
                isLuggage: isLuggage,
                isClothing: isClothing,
                isBestSeller: isBestSeller,
            })
                .then(() => {
                    // Reset fields if function succeeded
                    setName('');
                    setDescription('');
                    setPrice('');
                    setInStock(true);
                    setIsLuggage(false);
                    setIsClothing(false);
                    setIsBestSeller(false);
                    setImages([]);
                    setShowModal(true);
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
        if (event.target.files) {

            const tempImages = [];
            for (let i = 0; i < event.target.files.length; i++) {

                tempImages.push(event.target.files[i]); //push all files uploaded into tempArray

            }

            setImages(tempImages); //setImages using temp array

        }
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        addProductToFirestore(images, name, description, price, inStock, isLuggage, isClothing, isBestSeller);

    };

    function handleCloseModal() {
        setShowModal(false);
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
                <h1><u>Add Product</u></h1>
                <br />
                <br />
                    <form onSubmit={handleSubmit}>
                        <label className='formItem' htmlFor='image'>Image:</label>
                        <input type='file' id='image' onChange={handleImageChange} required multiple />
                        <br />
                        <br />

                        <label className='formItem' htmlFor='name'>Name:</label>
                        <input type='text' id='name' maxLength={30} value={name} onChange={(e) => setName(e.target.value)} required />
                        <br />
                        <br />

                        <label className='formItem' htmlFor='description'>Description:</label>
                        <textarea id='description' style={{ width: '300px', height: '100px' }} value={description} onChange={(e) => setDescription(e.target.value)} required />
                        <br />
                        <br />

                        <label className='formItem' htmlFor='price'>Price:</label>
                        <input type='number' id='price' value={price} onChange={(e) => setPrice(e.target.value)} required />
                        <br />
                        <br />

                        <label className='formItem'><u>In Stock?:</u></label>
                        <input type='radio' id='inStockTrue' name='inStock' value={true} onChange={(e) => setInStock(e.target.value)} required />
                        {'   '}
                        <label htmlFor='inStockTrue'>Yes</label>
                        <br />
                        {'   '}
                        <input type='radio' id='inStockFalse' name='inStock' value={false} onChange={(e) => setInStock(e.target.value)} />
                        {'   '}
                        <label htmlFor='inStockFalse'> No </label>
                        <br />
                        <br />

                        <label className='formItem'>Is Product A&nbsp;<u>Luggage?:</u></label>
                        <input type='radio' id='isLuggageTrue' name='isLuggage' value={true} onChange={(e) => setIsLuggage(e.target.value)} required />
                        {'   '}
                        <label htmlFor='isLuggageTrue'>Yes</label>
                        <br />
                        {'   '}
                        <input type='radio' id='isLuggageFalse' name='isLuggage' value={false} onChange={(e) => setIsLuggage(e.target.value)} />
                        {'   '}
                        <label htmlFor='isLuggageFalse'>No</label>
                        <br />
                        <br />

                        <label className='formItem'>Is Product A&nbsp;<u>Clothing?:</u> </label>
                        <input type='radio' id='isClothingTrue' name='isClothing' value={true} onChange={(e) => setIsClothing(e.target.value)} required />
                        {'   '}
                        <label htmlFor='isClothingTrue'>Yes</label>
                        <br />
                        {'   '}
                        <input type='radio' id='isClothingFalse' name='isClothing' value={false} onChange={(e) => setIsClothing(e.target.value)} />
                        {'   '}
                        <label htmlFor='isClothingFalse'>No</label>
                        <br />
                        <br />

                        <label className='formItem'>Is Product A&nbsp;<u>Best Seller?:</u></label>
                        <input type='radio' id='isBestSellerTrue' name='isBestSeller' value={true} onChange={(e) => setIsBestSeller(e.target.value)} required />
                        {'   '}
                        <label htmlFor='isBestSellerTrue'>Yes</label>
                        <br />
                        {'   '}
                        <input type='radio' id='isBestSellerFalse' name='isBestSeller' value={false} onChange={(e) => setIsBestSeller(e.target.value)} />
                        {'   '}
                        <label htmlFor='isBestSellerFalse'>No</label>
                        <br />
                        <br />
                        <Button className='success' type='submit'>Add Product</Button>
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
