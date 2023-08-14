import React, { useState } from "react";
import { storage, auth, firestore } from "../firebase";
import { useHistory } from "react-router-dom";
import {collection, addDoc} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";


const NewPost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();
  const currentUser = auth.currentUser;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, image.name);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(firestore, "posts"), {
        username: currentUser.email,
        content,
        imageUrl,
      });

      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error creando publicación:", error);
    }
    history.push("/");
  };

  return (
    <div>
      <h2 className="header">Nueva Publicación</h2>
      <form onSubmit={handlePostSubmit}>
        <textarea
          placeholder="Escribe tu publicación aquí..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit" className="submit-button">Publicar</button>
      </form>
    </div>
  );
};

export default NewPost;
