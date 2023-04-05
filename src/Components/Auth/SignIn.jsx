import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        console.log("YES")
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.uid);
            })
            .catch((error) => {
                console.log(error);
            });
        // setEmail('')
        // setPassword('')
    };

    const setEmailFunc = (e) => {
        console.log(e)
        setEmail(e.target.value)
    }

    return (
        <div className="sign-in-container">
            <form onSubmit={signIn} action="#">
                <h1>Log In to your Account</h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={setEmailFunc}>
                </input>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default SignIn;