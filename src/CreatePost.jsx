import React from "react";
import { Link, redirect } from "react-router-dom";
import "./CreatePost.css";
import { useState } from "react";
import { useUser } from "./UserProvider";

const CreatePost = () => {
  const [isDraft, setIsDraft] = useState(false);
  const { user } = useUser();

  const url = "http://localhost:3001/api/posts";

  const submitPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const text = form.text.value;

    const postOptions = {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        text: text,
        isDraft: isDraft,
      }),
    };

    try {
      const response = await fetch(url, postOptions);
      const result = await response.json();
      redirect("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!user) {
    return;
  }

  return (
    <main className="create-post-main">
      <header>
        <h1>Create Post</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/random">Random</Link>
        </div>
      </header>
      <form className="create-post-form" onSubmit={submitPost}>
        <div className="input-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Why frogs are..."
            maxLength={50}
          />
        </div>
        <div className="input-group">
          <label htmlFor="text">Text: </label>
          <textarea
            type="text"
            id="text"
            name="text"
            placeholder="Today is cool..."
            maxLength={2000}
          />
        </div>
        <button type="submit">Post</button>
        <button type="submit" onClick={() => setIsDraft(true)}>
          Save to drafts
        </button>
      </form>
    </main>
  );
};

export default CreatePost;