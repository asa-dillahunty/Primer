import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth } from './Components/firebase';

import './App.css';

import Login from "./Components/Login";
import Dashboard from './Components/Dashboard';
import Lost from './Components/Lost';


function App() {
  return (
    <>
    <Routes>
      {/* <Route index element={<App />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={ <Lost />} />
    </Routes>
    </>
  );
}


// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });


export default App;