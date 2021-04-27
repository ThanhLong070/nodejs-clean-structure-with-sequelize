const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const authController = require('../../controllers/auth');

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/signup', asyncMiddleware(authController.signup));
};
