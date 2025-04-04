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

const notFoundPage = (req, res) => {
  res.status(404).render('404-page', {
    nameErr: null,
    postErr: null,
  });
};

module.exports = {
  redirectHomePage,
  homePage,
  notFoundPage,
};
