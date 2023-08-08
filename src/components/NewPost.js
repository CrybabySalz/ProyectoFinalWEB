import React, { useState } from "react";
import { firestore, storage } from "./firebase";

const NewPost = ({ currentUser }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (image) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`${currentUser.uid}/${image.name}`);
        await imageRef.put(image);
        imageUrl = await imageRef.getDownloadURL();
      }

      await firestore.collection("posts").add({
        username: currentUser.email,
        content,
        imageUrl,
      });

      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error creando publicación:", error);
    }
  };

  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={handlePostSubmit}>
        <textarea
          placeholder="Escribe tu publicación aquí..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default NewPost;
