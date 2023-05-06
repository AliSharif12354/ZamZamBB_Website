import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Card, Modal, Button, Carousel } from "react-bootstrap"
import { db, auth } from '../Firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import Navbar_V2 from '../Components/Navbar_V2';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer'

export default function EditProductSpecific(props) {

    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [pId, setPiD] = useState("");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [inStock, setInStock] = useState(false);
    const [isLuggage, setIsLuggage] = useState(false);
    const [isClothing, setIsClothing] = useState(false);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    var out = <></>;


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);

            if (user) {
                const fetchProduct = async () => {
                    const docRef = doc(db, "products", productID);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProduct(docSnap.data());
                    } else {
                        console.log("No such document exists!");
                    }
                };

                fetchProduct();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [productID]);

    useEffect(() => {
        if (!currentUser) {
            setProduct(null);
        }
    }, [currentUser]);

    if (!currentUser) {
        return <div>Route Not Found</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product)
    };

    const handleImageChange = (e) => {
        // ...
    };

    function handleCloseModal() {
        setShowModal(false);
        setIsCompleted(false);
    }


    if (currentUser) {

        console.log(product)
        console.log(productID)

        out =
            <>
                <Navbar_V2 />
                <div className='formContainer'>
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

                        <label className='formItem'>Is Product A&nbsp;<u>Luggage?</u> :</label>
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

