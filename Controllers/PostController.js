import Post from '../models/Post.js';

const createPost = async (req, res) => {
  const { content } = req.body;
  if (!content || content.trim().length === 0) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    const post = new Post({
      userId: req.user._id,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await post.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    post.content = content;
    post.updatedAt = new Date();
    await post.save();

    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
export {
    createPost, updatePost
};