import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        console.log("YES")
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.uid);
            })
            .catch((error) => {
                console.log(error);
            });
        // setEmail('')
        // setPassword('')
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp} action="#">
                <h1>Sign up with email and password!</h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}>
                </input>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default SignUp;