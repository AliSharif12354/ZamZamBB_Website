import React from 'react'

export default function AddProductRoute() {

    var out = <></>;
    const [currentUser, setCurrentUser] = useState(null); //use state currentUser to hold auth user

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
            <div className='formContainer'>

            </div>

    }

    return (
        out
    )

}
