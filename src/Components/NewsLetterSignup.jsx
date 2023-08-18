import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap'; // Assuming you have the Bootstrap library installed

import { db } from '../Firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../Styles/NewsLetterSignup.css';

const NewsLetterSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can implement the logic to send the user's name and email to the backend (Firebase)
        // For now, let's just display a success message if the inputs are valid
        if (name.trim() !== '' && email.trim() !== '' && validateEmail(email)) {
            setShowSuccessMessage(true);
            setShowErrorMessage(false);

            const newsLetterRef = collection(db, "NewsLetter");
            try {
                await addDoc(newsLetterRef, {
                    name: name,
                    email: email
                });
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    };

    const validateEmail = (email) => {
        // You can implement a basic email validation logic here or use a library like validator.js
        // For simplicity, we'll just use a basic regular expression for this example
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className='container-news'>
            <div className="newsletter-section">
                <h2>Promos and Offers! Join our Newsletter</h2>
                <p>Get real-time news of promotional offers. Up to 70% off at select times!</p>
                {showSuccessMessage && (
                    <Alert variant="success">Thank you for subscribing to our newsletter!</Alert>
                )}
                {showErrorMessage && (
                    <Alert variant="danger">Please enter a valid name and email address.</Alert>
                )}
                <Form className='input-form' onSubmit={handleSubmit}>
                    <Form.Group className='input-form' controlId="formName">
                        <Form.Label style={{color: '#FFFFCC'}}>Your name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='input-form' controlId="formEmail">
                        <Form.Label style={{color: '#FFFFCC'}}>Your email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign up
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default NewsLetterSignup;