import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdatePost.css";

const UpdatePost = () => {
  const postId = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const url = `http://localhost:3001/api/posts/${postId.id}`;

    const fetchPost = async () => {
      const res = await fetch(url);
      const result = await res.json();
      setPost(result);
    };

    fetchPost();
  }, []);

  const cancelEdit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const savePost = (e) => {
    e.preventDefault();
  };

  if (!post) return;

  return (
    <main className="update-post-main">
      <form className="update-post-form">
        <div className="label-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post.title}
          />
        </div>
        <div className="label-group">
          <label htmlFor="text">Text:</label>
          <textarea
            name="text"
            id="text"
            cols="30"
            rows="10"
            defaultValue={post.text}
          ></textarea>
        </div>
        <button onClick={cancelEdit}>Cancel</button>
        <button>Save</button>
      </form>
    </main>
  );
};

export default UpdatePost;
