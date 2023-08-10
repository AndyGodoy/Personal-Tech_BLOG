const express = require('express');
const { User, Post } = require('../models'); 
const router = express.Router();

// Display user's dashboard with their posts
router.get('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/auth/login');
      return;
    }

    const user = await User.findByPk(req.session.user_id, {
      include: [{ model: Post }],
    });

    const userData = user.get({ plain: true });

    res.render('dashboard', {
      user: userData,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a new post
router.post('/new', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/auth/login');
      return;
    }

    await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a post
router.put('/edit/:id', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/auth/login');
      return;
    }

    await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a post
router.delete('/delete/:id', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/auth/login');
      return;
    }

    await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
