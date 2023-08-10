const express = require('express');
const { User, Post, Comment } = require('../models'); 
const router = express.Router();

// Display homepage with existing blog posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
      order: [['createdAt', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Display individual blog post with comments
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: [User] }],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
