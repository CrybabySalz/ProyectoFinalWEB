import React, { useState, useEffect } from "react";
import Post from "./Post";
import { firestore, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {signOut} from "firebase/auth";
import { Link } from "react-router-dom"


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
        <Link to="/login" className="auth-button">Iniciar Sesión</Link>
        <Link to="/signup" className="auth-button">Registrarse</Link>
        <Link to="/newpost" className="auth-button">Crear post</Link>
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


