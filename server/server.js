const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Enable CORS for the React app
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Blogposts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define a Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Create a Post model
const Post = mongoose.model('Post', postSchema);

// Routes for handling posts
// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch posts from MongoDB
    res.json(posts); // Send the posts as JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE route
app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;  
    Post.findByIdAndDelete(postId)
      .then(deletedPost => {
        if (!deletedPost) {
          return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send({ message: 'Post deleted successfully' });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send({ message: 'Error deleting post' });
      });
});

// Add a new post
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;

  const newPost = new Post({
    title,
    content,
  });

  try {
    const savedPost = await newPost.save(); // Save the post to MongoDB
    res.status(201).json(savedPost); // Return the saved post
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
