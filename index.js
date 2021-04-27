/* eslint-disable import/order */
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`)
});

const express = require('express');

const Logger = require('./loaders/logger');

async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   * */
  // eslint-disable-next-line global-require
  await require('./loaders')(app);

  const port = process.env.PORT || 5000;

  app.listen(port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }

    Logger.success(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
