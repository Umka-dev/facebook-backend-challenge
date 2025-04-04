const postModel = require('../models/post-model');

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
  // console.log('req.params.postId', req.params.postId);
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

const renderEditForm = (req, res) => {
  const postId = req.params.postId;
  postModel
    .findById(postId)
    .then((post) => {
      res.render('edit-post-page', {
        post,
        nameErr: null,
        postErr: null,
      });
    })
    .catch((err) => {
      console.error('Error:', err);
    });
};

const editPost = (req, res) => {
  const postId = req.params.postId;
  const updatedData = req.body;

  console.log('Editing article with ID:', postId);
  console.log('updatedData:', updatedData);

  if (!postId) {
    return res.status(404).render('404-page');
  }

  postModel
    .findByIdAndUpdate(postId, req.body, { new: true, runValidators: true })
    .then((updatedPost) => {
      if (!updatedPost) {
        console.log('Post not found after update:', postId);
        return res.status(404).render('404-page');
      }
      console.log('Post successfully updated:', updatedPost);
      res.redirect('/feed');
    })
    // Handle saving changes and validation errors
    .catch((err) => {
      // console.log('ERROR MESSAGE: ', err);
      if (err.errors?.name || err.errors?.message) {
        return res.render('edit-post-page', {
          post: { ...req.body, _id: postId },
          nameErr: err.errors.name ? err.errors.name : null,
          postErr: err.errors.message ? err.errors.message : null,
          savingErr: null,
        });
      }
      res.render('edit-post-page', {
        post,
        titleErr: null,
        articleErr: null,
        savingErr: 'Error saving post',
      });
    });
};

const deletePost = (req, res) => {
  const postId = req.params.postId;

  postModel
    .findByIdAndDelete(postId)
    .then((deletedPost) => {
      if (!deletedPost) {
        return res.status(404).send('Post not found');
      }
      console.log('Post was deleted');
      res.redirect('/feed');
    })
    .catch((err) => {
      console.log(err);
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
  homePage,
  addPost,
  getPost,
  renderEditForm,
  editPost,
  deletePost,
  notFoundPage,
};
