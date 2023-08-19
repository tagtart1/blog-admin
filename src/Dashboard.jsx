import React, { useEffect, useState } from "react";
import { useUser } from "./UserProvider";
import "./Dashboard.css";
import moment from "moment";

const Dashboard = ({ user }) => {
  const { setUser } = useUser();
  const [posts, setPosts] = useState(null);

  const logOut = async () => {
    const response = await fetch("http://localhost:3001/api/logout", {
      credentials: "include",
      method: "POST",
    });

    if (response.ok) {
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:3001/api/posts?userId=${user.id}`
      );

      const results = await response.json();
      console.log(results);
      setPosts(results);
    };

    fetchPosts();
  }, [user.id]);

  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <h1>Hello {user.username}</h1>
        <button className="logout-button" onClick={logOut}>
          Log out
        </button>
      </header>
      <section className="posts-feed">
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
