const { Router } = require('express');

const route = Router();

module.exports = app => {
  app.use('/users', route);

  route.get('/hello', (req, res) => {
    return res.json({ message: 'Hello user' }).status(200);
  });
};
