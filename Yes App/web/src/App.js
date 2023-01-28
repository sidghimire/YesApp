import React, { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/adminFirebase";
import AuthRouter from "./router/AuthRouter";
import MainRouter from "./router/MainRouter";
import { UserContext } from "./contexts/context";

const App = () => {
  const [userState, setUserState] = useState(0);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (auth.currentUser.emailVerified) {
        setUserState(2);
      } else {
        setUserState(1);
      }
    } else {
      setUserState(1);
    }
  });
  if (userState == 0) {
    return <></>;
  } else if (userState == 1) {
    return <AuthRouter />;
  } else {
    return (
      <UserContext.Provider value={{ admin: false }}>
        <MainRouter />
      </UserContext.Provider>
    );
  }
};

export default App;
