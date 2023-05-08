import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Card, Modal, Container, Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap"
import { db, auth } from '../Firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import Navbar_V2 from '../Components/Navbar_V2';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer'

export default function EditProductSpecific() {

    const { productID } = useParams(); //get product id from params
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
                        const product = docSnap.data();
                        setProduct(product);
                        setImages(product.imageSrc || []);
                        setDescription(product.description || '');
                        setName(product.name || '');
                        setPrice(product.price || '');
                        setInStock(product.inStock || false);
                        setIsLuggage(product.isLuggage || false);
                        setIsClothing(product.isClothing || false);
                        setIsBestSeller(product.isBestSeller || false);
                    } else {
                        console.log("No such document exists!");
                    }
                };

                fetchProduct();
            } else {
                setProduct(null);
            }
        });

        return () => {
            unsubscribe();
        };

    }, [productID, setCurrentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product)
    };

    const handleImageChange = (event) => {

        if (event.target.files && event.target.files.length > 0) {

            // Create a copy of the existing images array
            const tempImages = [...images];
            // Add the files selected by the user to the end of the array
            for (let i = 0; i < event.target.files.length; i++) {
                tempImages.push(event.target.files[i]);
            }
            // Set the state of images to the new array
            setImages(tempImages);

        }

    };

    function moveUp(index) {
        if (index === 0) { // check if first in array
            console.log("this is images: " + images)
            return;
        }
        const temp = images[index - 1];
        const updatedImages = [...images];
        updatedImages.splice(index - 1, 2, images[index], temp);
        setImages(updatedImages);
        console.log("this is images: " + images)

    }

    function moveDown(index) {
        if (index === images.length - 1) { //check if last in array
            console.log("this is images: " + images)
            return;
        }
        const temp = images[index + 1];
        const updatedImages = [...images];
        updatedImages.splice(index, 2, temp, images[index]);
        setImages(updatedImages);
        console.log("this is images: " + images)

    }


    function handleCloseModal() {
        setShowModal(false);
        setIsCompleted(false);
    }

    if (!currentUser) {
        return <div>Route Not Found</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    if (currentUser) {

        console.log(product)
        console.log(productID)

        out =
            <>
                <Navbar_V2 />
                <div className='formContainer'>
                    <form onSubmit={handleSubmit}>

                        <div className="d-flex flex-wrap">
                            {images.map((imageUrl, index) => (
                                <Card key={index} className="col-lg-3 mb-4 me-4" style={{ maxWidth: '300px' }}>
                                    <Card.Img variant="top" src={imageUrl} />
                                    <Card.Body>
                                        <Button variant="secondary" onClick={() => moveUp(index)}>
                                            Move Up
                                        </Button>
                                        <br />
                                        <Button variant="secondary" onClick={() => moveDown(index)}>
                                            Move Down
                                        </Button>
                                        <br />
                                        <Button variant="danger" onClick={() => handleDeletePhoto(index)}>
                                            Delete Photo
                                        </Button>
                                        <br />
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>

                        <label className='formItem' htmlFor='image'>Image:</label>
                        <input type='file' id='image' onChange={handleImageChange} multiple />
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
                        <Button className='success' type='submit'>Edit Product</Button>
                    </form>
                    <Modal show={showModal} onHide={handleCloseModal} centered className='addmodal'>
                        <Modal.Header closeButton>
                            <Modal.Title>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>The product has been edited successfully!</p>
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

