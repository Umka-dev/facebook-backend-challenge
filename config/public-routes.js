const express = require('express');
const postController = require('../controller/post-controller');
const route = express.Router();

// Routes
route.get('/', postController.redirectHomePage);
route.get('/feed', postController.homePage);

//404 route
route.use(postController.notFoundPage);

module.exports = route;
