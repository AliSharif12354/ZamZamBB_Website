import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Card, Modal, Button} from "react-bootstrap"
import { db, auth, files } from '../Firebase';
import { doc, getDoc, updateDoc, collection, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import Navbar_V2 from '../Components/Navbar_V2';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer'

export default function EditProductSpecific() {

    const { productID } = useParams(); //get product id from params
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [inStock, setInStock] = useState(false);
    const [isLuggage, setIsLuggage] = useState(false);
    const [isClothing, setIsClothing] = useState(false);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const [showModal, setShowModal] = useState(false);
    //const [showDeletePhotoModal, setShowDeletePhotoModal] = useState(false);
    //const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
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
        editProductInFirestore(productID, images, newImages, name, description, price, inStock, isLuggage, isClothing, isBestSeller);

    };

    function editProductInFirestore(productID, images, newImages, name, description, price, inStock, isLuggage, isClothing, isBestSeller) {

        const productsRef = collection(db, "products"); // get collection from db ref
        const itemsRef = ref(files, "Images/Items"); // getStorage get Path
        const timestamp = new Date().getTime(); //timestamp to create unique name for image file each time

        // Upload images to Firebase Storage
        const uploadPromises = newImages.map((image, index) => {

            const imageName = `${name}_${timestamp}_${index}`; //index to create a new name for each photo being uploaded
            const imageRef = ref(itemsRef, imageName); //get image storage and create name for product

            return uploadBytes(imageRef, image).then((snapshot) => { //upload image to imageRefrence
                return getDownloadURL(snapshot.ref); //return downloadurl array to be used in promise function 
            });

        });

        Promise.all(uploadPromises).then((downloadURLs) => { //uploadPromises is array holding all download urls

            const updatedImages = [...images];
            if (downloadURLs && downloadURLs.length > 0) {
                updatedImages.push(...downloadURLs);
            }
            // Update product document in Firestore with new values and image URLs
            const productRef = doc(productsRef, productID);
            updateDoc(productRef, {
                imageSrc: updatedImages,
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
                    console.log("Product updated successfully");
                    
                })
                .catch((error) => {
                    console.error("Error updating product: ", error);
                });

        }).catch((error) => {
            console.error("Error uploading images: ", error);
        });

    }


    const handleImageChange = (event) => {

        if (event.target.files && event.target.files.length > 0) {

            // Create a copy of the existing images array
            const tempImages = [];
            // Add the files selected by the user to the end of the array
            for (let i = 0; i < event.target.files.length; i++) {
                tempImages.push(event.target.files[i]);
            }
            // Set the state of images to the new array
            setNewImages(tempImages);

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

    function handleDeletePhoto(index) {

        const url = images[index];
        const imageRef = ref(files, url);

        console.log(imageRef);

        deleteObject(imageRef)
            .then(() => {

                const updatedImages = [...images];
                updatedImages.splice(index, 1);
                setImages(updatedImages); //create new updated images array
                const productsRef = collection(db, "products"); 
                const productRef = doc(productsRef, productID);
                updateDoc(productRef, { //update doc in firebase
                imageSrc: updatedImages,
                })
                handleClosePhotoModal();
                console.log("File deleted successfully");

            })
            .catch((error) => {

                console.log("Error deleting file:", error);
            
            });

    }

    function handleCloseModal() {

        setShowModal(false);

    }

    if (!currentUser) {
        return <div>Route Not Found</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    if (currentUser) {

        //console.log(product)
        //console.log(productID)

        out =
            <>
                <Navbar_V2 />
                <div className='formContainer'>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex flex-wrap justify-content-center align-items-center flex-wrap" style={{ paddingLeft: "22px" }}>
                            {images.map((imageUrl, index) => (
                                <Card key={index} bg="dark" className="col-lg-3 mb-4 me-4" style={{ maxWidth: '50%' }}>
                                    <Card.Img variant="top" src={imageUrl} />
                                    <Card.Body>
                                        <Button variant="secondary" onClick={() => moveUp(index)}>Move Up</Button>
                                        <br />
                                        <br />
                                        <Button variant="secondary" onClick={() => moveDown(index)}>Move Down</Button>
                                        <br />
                                        <br />
                                        <Button variant="danger" onClick={() => handleDeletePhoto(index)}>Delete Photo</Button>
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
                        <Button variant='success' type='submit'>Edit Product</Button>
                        <br />
                        <br />
                    </form >
                    <Button variant='danger' type='submit'>Delete Product</Button>
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
                </div >
                <Footer />
            </>

    }




    return (
        out
    )

}

