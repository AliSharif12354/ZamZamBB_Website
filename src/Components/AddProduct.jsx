import React from 'react'
import { useState, useEffect } from "react";
import { auth } from '../Firebase';
import Navbar_V2 from './Navbar_V2';
import Footer from '../Components/Footer';
import { Button } from 'react-bootstrap';
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
    const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user

    const handleImageChange = (event) => {
        if (event.target.files) {
        
            const tempImages = [];
            for (let i = 0; i < event.target.files.length; i++) {

                images.push(event.target.files[i]);
            
            }
            
            setImages(tempImages);
        
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const db = firebase.firestore();
        // const productRef = db.collection('products');
        // const storageRef = firebase.storage().ref();

        // try {
        //     // Upload the image to Firebase Storage
        //     const imageRef = storageRef.child(`product-images/${image.name}`);
        //     const snapshot = await imageRef.put(image);
        //     const imageSrc = await snapshot.ref.getDownloadURL();

        //     // Create a new product document
        //     const newProduct = {
        //         description,
        //         imageSrc,
        //         name,
        //         price: parseFloat(price),
        //         inStock,
        //         isLuggage,
        //         isClothing,
        //         isBestSeller,
        //     };
        //     await productRef.add(newProduct);
        //     console.log('Product added successfully!');
        // } catch (error) {
        //     console.error('Error adding product: ', error);
        // }

        console.log(images);
        console.log(description);
        console.log(name);
        console.log(price);
        console.log("value of inStock: " + inStock);
        console.log("value of isLuggage:" + isLuggage);
        console.log("value of isClothing: " + isClothing);
        console.log("value of isBestSeller: " + isBestSeller);


    };

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
                <div  className='formContainer'>
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
                        <input type='text' id='description' style={{ width: '300px', height: '100px' }} value={description} onChange={(e) => setDescription(e.target.value)} required />
                        <br />
                        <br />

                        <label className='formItem' htmlFor='price'>Price:</label>
                        <input type='number' id='price' value={price} onChange={(e) => setPrice(e.target.value)} required />
                        <br />
                        <br />

                        <label className='formItem'><u>In Stock?:</u></label>
                        <input type='radio' id='inStockTrue' name='inStock' value={true} onChange={(e) => setInStock(true)} required />
                        {'   '}
                        <label htmlFor='inStockTrue'>Yes</label>
                        <br />
                        {'   '}
                        <input type='radio' id='inStockFalse' name='inStock' value={false} onChange={(e) => setInStock(false)} />
                        {'   '}
                        <label htmlFor='inStockFalse'> No </label>
                        <br />
                        <br />

                        <label className='formItem'>Is Product A&nbsp;<u>Luggage?</u> :</label>
                        <input type='radio' id='isLuggageTrue' name='isLuggage' value={true} onChange={(e) => setIsLuggage(true)} required />
                        {'   '}
                        <label htmlFor='isLuggageTrue'>Yes</label>
                        <br />
                        {'   '}
                        <input type='radio' id='isLuggageFalse' name='isLuggage' value={false} onChange={(e) => setIsLuggage(false)} />
                        {'   '}
                        <label htmlFor='isLuggageFalse'>No</label>
                        <br />
                        <br />

                        <label className='formItem'>Is Product A&nbsp;<u>Clothing?:</u> </label>
                        <input type='radio' id='isClothingTrue' name='isClothing' value={true} onChange={(e) => setIsClothing(true)} required />
                        {'   '}
                        <label htmlFor='isClothingTrue'>Yes</label>
                        <br />
                        {'   '}
                        <input type='radio' id='isClothingFalse' name='isClothing' value={false} onChange={(e) => setIsClothing(false)} />
                        {'   '}
                        <label htmlFor='isClothingFalse'>No</label>
                        <br />
                        <br />

                        <label className='formItem'>Is Product A&nbsp;<u>Best Seller?:</u></label>
                        <input type='radio' id='isBestSellerTrue' name='isBestSeller' value={true} onChange={(e) => setIsBestSeller(true)} required />
                        {'   '}
                        <label htmlFor='isBestSellerTrue'>Yes</label>
                        <br />
                        {'   '}
                        <input type='radio' id='isBestSellerFalse' name='isBestSeller' value={false} onChange={(e) => setIsBestSeller(false)} />
                        {'   '}
                        <label htmlFor='isBestSellerFalse'>No</label>
                        <br />
                        <br />
                        <Button className='success' type='submit'>Add Product</Button>
                    </form>
                </div>
                <Footer />
            </>

    }

    return (
        out
    )
}
