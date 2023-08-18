import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

const AdminEmailRoute = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (subject.trim() !== '' && content.trim() !== '') {
            // Get all email addresses from the NewsLetter collection
            const querySnapshot = await getDocs(collection(db, 'NewsLetter'));
            const emailAddresses = querySnapshot.docs.map((doc) => doc.data().email);

            // Send email to each subscriber
            emailAddresses.forEach((emailAddress) => {
                // Here, you can implement the logic to send emails using a service like Nodemailer
                // For demonstration purposes, we'll just log the email sending
                console.log(`Sending email to ${emailAddress}`);
            });

            setShowSuccessMessage(true);
            setShowErrorMessage(false);
        } else {
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    };

    return (
        <div className="container-admin-email">
            <div className="admin-email-section">
                <h2>Send Email to Subscribers</h2>
                {showSuccessMessage && (
                    <Alert variant="success">Emails sent successfully!</Alert>
                )}
                {showErrorMessage && (
                    <Alert variant="danger">Please enter a subject and email content.</Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formSubject">
                        <Form.Label>Subject Line:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter subject line"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContent">
                        <Form.Label>Email Content:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter email content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Send Email
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AdminEmailRoute;