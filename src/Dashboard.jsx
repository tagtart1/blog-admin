import React, { useEffect, useState } from "react";
import { useUser } from "./UserProvider";
import "./Dashboard.css";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, setUser } = useUser();
  const [posts, setPosts] = useState(null);
  const [draftPosts, setDraftPosts] = useState(null);
  const navigate = useNavigate();

  const logOut = async () => {
    const response = await fetch("http://localhost:3001/api/logout", {
      credentials: "include",
      method: "POST",
    });

    if (response.ok) {
      setUser(null);
      navigate("/log-in");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:3001/api/posts?user_id=${user.id}`
      );

      const results = await response.json();
      console.log(results);
      setPosts(results);
    };

    const fetchDrafts = async () => {
      const response = await fetch(
        `http://localhost:3001/api/posts?user_id=${user.id}&only_drafts=true`
      );

      const results = await response.json();

      console.log(results);
      setDraftPosts(results);
    };

    if (!user) {
      return;
    }

    fetchDrafts();
    fetchPosts();
  }, [user]);

  if (!user) {
    return;
  }

  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <h1>Hello {user.username}</h1>
        <div>
          <button className="logout-button" onClick={logOut}>
            Log out
          </button>
          <Link to="/create">Create</Link>
        </div>
      </header>
      <div className="user-post-sections">
        <section className="posts-feed">
          <h2>Posted</h2>
          {posts ? (
            posts.map((post) => {
              return (
                <article key={post._id} className="post-parent">
                  <h2>{post.title}</h2>
                  <p className="post-date">
                    Posted on {moment(post.timestamp).format("MMM Do, YYYY")}
                  </p>
                </article>
              );
            })
          ) : (
            <h1>You have 0 posts</h1>
          )}
        </section>
        <section className="posts-feed">
          <h2>Drafts</h2>
          {draftPosts ? (
            draftPosts.map((post) => {
              return (
                <article key={post._id} className="post-parent">
                  <h2>{post.title}</h2>
                  <p className="post-date">
                    Started on {moment(post.timestamp).format("MMM Do, YYYY")}
                  </p>
                </article>
              );
            })
          ) : (
            <h1>You have 0 drafts</h1>
          )}
        </section>
      </div>
      <a
        href="http://localhost:3000/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Goto blog
      </a>
    </main>
  );
};

export default Dashboard;
