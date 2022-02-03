import React, {useState, useEffect} from "react";
import * as firebase from "firebase";
const Context = React.createContext();

function ContextProvider(props) {
  const [userObj, setUserObj] = useState(null);
  const [userRef, setUserRef] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const newUserRef = firebase.firestore().collection("users").doc(user.uid);
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