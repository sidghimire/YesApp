import React, { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { adminAuth } from "./config/adminFirebase";
import AuthRouter from "./router/AuthRouter";
import MainRouter from "./router/MainRouter";

const App = () => {
  const [userState, setUserState] = useState(0);
  onAuthStateChanged(adminAuth, (user) => {
    if (user) {
      if (adminAuth.currentUser.emailVerified) {
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
    return <MainRouter />;
  }
};

export default App;
