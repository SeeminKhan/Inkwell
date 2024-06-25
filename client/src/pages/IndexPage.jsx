import React, { useEffect, useState } from 'react';
import Post from "../Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => response.json())
      .then(posts => setPosts(posts));
  }, []);

  return (
    <div className="min-h-screen bg-black text-black dark:text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      ) : (
        <p className="text-center">No posts available</p>
      )}
    </div>
  );
}

export default IndexPage;
