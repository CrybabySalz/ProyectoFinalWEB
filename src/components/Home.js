import React, { useState, useEffect } from "react";
import Post from "./Post";
import { firestore } from "./firebase";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(newPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.username}
          content={post.content}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default Home;
