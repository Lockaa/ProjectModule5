import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [newPost, setNewPost] = useState({ title: '', content: '' }); // State for new post input fields

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/posts') // Corrected API URL to backend on port 5000
      .then(response => {
        setPosts(response.data); // Set the posts from the backend
      })
      .catch(error => console.log(error)); // Handle any errors in fetching posts
  }, []);

  // Handle form submission to create a new post
  const handlePostSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit behavior

    // Send the new post to the backend
    axios.post('http://localhost:5000/posts', newPost) // Corrected API URL to backend on port 5000
      .then(response => {
        setPosts([...posts, response.data]); // Add the new post to the list
        setNewPost({ title: '', content: '' }); // Reset form fields
      })
      .catch(error => console.log(error)); // Handle any errors in submitting the post
  };

  return (
    <div>
      <h1>Posts</h1>
      {/* Form for adding new post */}
      <form onSubmit={handlePostSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={newPost.title} 
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea 
          placeholder="Content" 
          value={newPost.content} 
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button type="submit">Add Post</button>
      </form>

      {/* List of posts */}
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
