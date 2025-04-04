const postModel = require('../models/post-model');

const redirectHomePage = (req, res) => {
  res.redirect('/feed');
};

const homePage = (req, res) => {
  postModel
    .find()
    .then((posts) => {
      res.render('home-page', { posts, nameErr: null, postErr: null });
    })
    .catch((err) => {
      console.log('Error fetching posts:', err);
      res.status(500).send('Internal Server Error');
    });
};

const addPost = (req, res) => {
  const post = new postModel(req.body);
  post
    .save()
    .then(() => {
      res.redirect('/feed');
    })
    .catch((err) => {
      // console.error('Validation error:', err);

      if (err.errors && (err.errors.name || err.errors.message)) {
        postModel
          .find()
          .then((posts) => {
            return res.render('home-page', {
              posts,
              nameErr: err.errors.name,
              postErr: err.errors.message,
            });
          })
          .catch((err) => {
            console.log('Error fetching posts:', err);
            res.status(500).send('Internal Server Error');
          });
      }
    });
};

const getPost = (req, res) => {
  postModel
    .findById(req.params.postId)
    .then((post) => {
      if (!post) {
        res.status(404).render('404-page');
      }
      res.render('one-post-page', {
        post,
        nameErr: null,
        postErr: null,
      });
    })
    .catch((err) => {
      console.error('Searching error:', err);
      res.status(500).send('Internal Server Error');
    });
};

const notFoundPage = (req, res) => {
  res.status(404).render('404-page', {
    nameErr: null,
    postErr: null,
  });
};

module.exports = {
  redirectHomePage,
  homePage,
  addPost,
  getPost,
  notFoundPage,
};
