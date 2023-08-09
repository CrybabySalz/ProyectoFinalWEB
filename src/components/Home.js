import React, { useState, useEffect } from "react";
import Post from "./Post";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {signOut} from "firebase/auth";
import {auth} from "../firebase"


const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsList();
  }, []);

  const getPostsList = async () => {
    try {
      const postsCollectionRef = collection(firestore, "posts");
      const data = await getDocs(postsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="header">Bookface</div>
      <div className="buttons-container">
        <button className="auth-button">Iniciar Sesión</button>
        <button className="auth-button">Registrarse</button>
        <button className="auth-button">Crear post</button>
        <button className="auth-button" onClick={logout}>Cerrar Sesión</button>
      </div>
      <div className="wall">
        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.username}
            content={post.content}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;


