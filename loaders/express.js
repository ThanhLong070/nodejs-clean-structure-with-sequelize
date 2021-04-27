const express = require('express');
const cors = require('cors');

const routes = require('../api');
const Logger = require('./logger');

module.exports = (app) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Use JSON, XML, urlencoded
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Load API routes
  app.use('/', routes());

  // / catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // / error handlers
  // app.use((err, req, res, next) => {
  //   /**
  //    * Handle 401 thrown by express-jwt library
  //    */
  //   if (err.name === 'UnauthorizedError') {
  //     return res
  //       .status(err.status)
  //       .send({ message: err.message })
  //       .end();
  //   }
  //   return next(err);
  // });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    Logger.error(`🔥 [  ${req.path}  ] : ${err.message} `);

    err.status = err.status || 500;
    err.errorCode = err.errorCode || err.status;

    res.status(err.status).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message,
    });
  });
};
