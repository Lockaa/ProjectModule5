import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [newPost, setNewPost] = useState({ title: '', content: '' }); // State for new post input fields
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form

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
        setShowForm(false); // Hide the form after submission
      })
      .catch(error => console.log(error)); // Handle any errors in submitting the post
  };

  // Handle canceling the form
  const handleCancel = () => {
    setShowForm(false); // Hide the form when canceled
  };

  // Deleting Posts
  const handleDeletePost = (postId) => {
    console.log('Deleting post with ID:', postId);  // Log to check the postId
    axios.delete(`http://localhost:5000/posts/${postId}`)
      .then(() => {
        // Remove the post from the state after successful deletion
        setPosts(posts.filter(post => post._id !== postId));
      })
      .catch(error => {
        console.log('Error deleting post:', error);
        alert('There was an error deleting the post.');
      });
  };
  

  return (
    <div>
      {/* Header with Add Post button on the top right */}
      <header>
        <h1>Blog of Super Something</h1>
        <button onClick={() => setShowForm(true)} className="add-post-button">Add Post</button>
      </header>

      {/* Show the form as a popup when showForm is true */}
      {showForm && (
        <div className="form-popup">
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
            <div>
              <button type="submit">Add Post</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      
      {/* Display posts stacked one above the other */}
      <div className="posts-container">
        {posts.map(post => (
          <div key={post._id} className="post-box">
            <div className="post-header">
              <h3>{post.title}</h3>
              {/* Delete button in the top right of each post */}
              <button className="delete-post-button" onClick={() => handleDeletePost(post._id)}>Delete</button>
            </div>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
