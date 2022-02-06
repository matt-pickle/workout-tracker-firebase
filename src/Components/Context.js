import React, {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore, doc, getDoc} from "firebase/firestore"
const Context = React.createContext();

function ContextProvider(props) {
  const [userObj, setUserObj] = useState(null);
  const [userUID, setUserUID] = useState(null);

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        setUserUID(user.uid);
        getDoc(doc(db, "users", user.uid))
        .then(doc => {
          const newUserObj = doc.data();
          setUserObj(newUserObj);
        })
        .catch(err => {
          alert("Error! " + err.message);
        });          
      } else {
        setUserObj(null);
      }
    });
    return () => unsubscribe();
  }, [db]);

  return (
    <Context.Provider value={{userObj: userObj, userUID: userUID}}>
      {props.children}
    </Context.Provider>
  )
}

export {ContextProvider, Context};