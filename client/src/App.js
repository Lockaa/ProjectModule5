import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Blog Post",
      content: "This is the content of the first post. Welcome to my blog!"
    },
    {
      id: 2,
      title: "Learning React",
      content: "React is an awesome library for building user interfaces. This is my journey learning React."
    },
    {
      id: 3,
      title: "Tips for Web Development",
      content: "In this post, I'll share some useful tips and tricks for web development, from using Git to optimizing performance."
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      setPosts([
        ...posts,
        { id: posts.length + 1, title: newPost.title, content: newPost.content }
      ]);
      setNewPost({ title: '', content: '' }); // Reset form
      setShowForm(false); // Hide form after submission
    }
  };

  // Handle post deletion
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Blog</h1>
        <button 
          className="add-post-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Make a Post"}
        </button>
      </header>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <button className="delete-btn" onClick={() => handleDelete(post.id)}>
              X
            </button>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="post-form">
          <h2>Create a New Post</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="title" 
              placeholder="Post Title" 
              value={newPost.title} 
              onChange={handleInputChange} 
              required 
            />
            <textarea 
              name="content" 
              placeholder="Post Content" 
              value={newPost.content} 
              onChange={handleInputChange} 
              required 
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
