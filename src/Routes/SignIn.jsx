import { Form, Button } from "react-bootstrap"
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase";
import "../Styles/Admin.css"
import Navbar_V2 from "../Components/Navbar_V2";
import Footer from '../Components/Footer.jsx'

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const signIn = (e) => {
        e.preventDefault();
        console.log("YES")
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.uid);
                setSuccess(true);
                window.location.href = "/";
            })
            .catch((error) => {
                alert("User not found")
                console.log(error);
            });
        // setEmail('')
        // setPassword('')
    };

    return (
        <>
            <Navbar_V2 />
            <div style={{ maxWidth: "500px", margin: "auto", padding: "1rem 0rem"}}>
                <Form className="admin" onSubmit={signIn}>
                    <h1 className="text-center mb-4">Log In to your Account</h1>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={e => setEmail(e.target.value)} value={email} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e => setPassword(e.target.value)} type="password" value={password} required />
                    </Form.Group>
                    {success ? (<p>Success!</p>) : <p></p>}
                    <Button className="w-100" type="submit">
                        Log In
                    </Button>
                </Form>
            </div>
            <Footer />
        </>
    );
};

export default SignIn;