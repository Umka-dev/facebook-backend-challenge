const express = require('express');
const postController = require('../controller/post-controller');
const route = express.Router();

// Routes
route.get('/', postController.redirectHomePage);
route.get('/feed', postController.homePage);
route.post('/new/post', postController.addPost);
route.get('/post/:postId', postController.getPost);
route.get('/feed/edit/:postId', postController.renderEditForm);
route.post('/feed/edit/:postId', postController.editPost);
route.post('/delete/post/:postId', postController.deletePost);

//404 route
route.use(postController.notFoundPage);

module.exports = route;
