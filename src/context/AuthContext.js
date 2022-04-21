import React, { useContext, useState, useReducer, useEffect } from "react";
import { auth, db, storage } from "../firebase";

import { DataFunctions } from "./DataFunctions";
import { reducer } from "./reducer";

// create am auth content
const AuthContext = React.createContext();

// finction to use context
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // =================================================================== new functions ===================
  //  function update email
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  // get current user info
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  // ==================collect personal data db

  useEffect(() => {
    if (currentUser) {
      db.collection("Users")
        .doc(currentUser.uid)
        .get()
        .then((querySnapshot) => {
          const response = querySnapshot.data();
          dispatch({ type: "CURRENT_USER_INFO", payload: response });
        });
    }
  }, [currentUser]);

  // get all users
  useEffect(() => {
    // if (state.CurrentUserInfo.UserType === "admin") {
    db.collection("Users")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((user) => {
          return arr.push(user.data());
        });

        dispatch({ type: "ALL_USERS", payload: arr });
      });

    // }
  }, [currentUser]);

  // ========default reducer data

  const defaultValues = {
    isLoggedIn: false,
    loader: false,
    isActive: false,
    Error: "",
    Message: "",
    progressBar: 0,
    CurrentUserInfo: [],
    updateEmail,
    allUsers: [],
    listDocIdImages: { urls: {}, docId: "" },
  };
  const [state, dispatch] = useReducer(reducer, defaultValues);

  const value = {
    DataFunctions,
    currentUser,
    updateEmail,
    state,
    db,
    setCurrentUser,
    storage,
    dispatch,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
