import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {collection} from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "../index.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await collection(firestore, "users").doc(userCredential.user.uid).set({
        firstName,
        lastName,
      });
    
    } catch (error) {
      console.error("Error al crear la cuenta:", error);
    }
    history.push("/");
  };

  return (
    <div>
      <h2 className="header">Registrarse</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default Signup;
