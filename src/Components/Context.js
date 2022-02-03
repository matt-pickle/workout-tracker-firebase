import React, {useState, useEffect} from "react";
const Context = React.createContext();

function ContextProvider(props) {
  const [user, setUser] = useState("");
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(true);

  //Gets username from web token
  useEffect(() => {
    fetch("/user/getUser")
      .then(res => {
        if (!res.ok) {
          res.text().then(text => {
            console.error(text);
          });
        } else {
          res.text().then(text => {
            setUser(text);
            //Gets current user's workoutHistory from database
            fetch(`/workout/getHistory?user=${text}`)
              .then(res => {
                if (!res.ok) {
                  res.text().then(text => {
                    console.error(text);
                  });
                } else {
                  res.text().then(text => {
                    setWorkoutHistory(JSON.parse(text));
                  });
                }
              });
            //Gets current user's weightHistory from database
            fetch(`/weight/getHistory?user=${text}`)
              .then(res => {
                if (!res.ok) {
                  res.text().then(text => {
                    console.error(text);
                  });
                } else {
                  res.text().then(text => {
                    setWeightHistory(JSON.parse(text));
                  });
                }
              });
          });
        }
      });
  }, [forceUpdate]);
  
  //Forces rerender of Context
  function updateContext() {
    setForceUpdate(prev => !prev);
  }

  return (
    <Context.Provider value={{user: user, workoutHistory: workoutHistory, weightHistory: weightHistory, updateContext: updateContext}}>
      {props.children}
    </Context.Provider>
  )
}

export {ContextProvider, Context};