import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import he from "he";
import "./UpdatePost.css";

const UpdatePost = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [shouldDraft, setShouldDraft] = useState();

  useEffect(() => {
    const url = `http://localhost:3001/api/posts/${params.id}`;

    const fetchPost = async () => {
      const res = await fetch(url);
      const result = await res.json();
      setPost(result);
      setShouldDraft(result.isDraft);
    };

    fetchPost();
  }, []);

  const cancelEdit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const updatePost = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:3001/api/posts/${params.id}`;
    const options = {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: params.id,
        title: e.target.title.value,
        text: e.target.text.value,
        isDraft: shouldDraft,
      }),
    };

    try {
      const response = await fetch(endpoint, options);

      if (!response.ok) {
        // Show error later
        return;
      }

      const result = await response.json();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:3001/api/posts/${params.id}`;
    const options = {
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: params.id }),
    };
    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      console.log(result);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!post) return;

  return (
    <main className="update-post-main" onSubmit={updatePost}>
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
            defaultValue={he.decode(post.text)}
          ></textarea>
        </div>
        <button onClick={cancelEdit} type="button">
          Cancel
        </button>
        <button type="submit">Save</button>
        <button type="button" onClick={deletePost}>
          Delete
        </button>
        {post.isDraft ? (
          <button type="submit" onClick={() => setShouldDraft(false)}>
            Post
          </button>
        ) : (
          <button type="submit" onClick={() => setShouldDraft(true)}>
            Send to drafts
          </button>
        )}
      </form>
    </main>
  );
};

export default UpdatePost;
