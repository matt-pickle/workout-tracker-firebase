import React, {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection} from "firebase/firestore"
const Context = React.createContext();

function ContextProvider(props) {
  const [userObj, setUserObj] = useState(null);
  const [userRef, setUserRef] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        const newUserRef = collection("users").doc(user.uid);
        setUserRef(newUserRef);
        newUserRef.get()
        .then(doc => {
          const newUserObj = doc.data();
          setUserObj(newUserObj);
        })
        .catch(err => {
          alert("Error!", err.message);
        });          
      } else {
        setUserObj(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{userObj: userObj, userRef: userRef}}>
      {props.children}
    </Context.Provider>
  )
}

export {ContextProvider, Context};