require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
//const favicon = require('serve-favicon');
//const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const nodemailer = require("nodemailer");

const app = express();

// Connects to the database
const connectDB = require('./db/db');
connectDB();

require('./configs/session.config')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build')));

const contactEmail = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  // logger: true,
  auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD
  },
  secure: true
});

//TEST EMAIL
contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send");
  }
});

// default value for title local
app.locals.title = 'Häußler Architekt';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// ROUTES
const apiPrefix = process.env.ENVIRONMENT === 'prod' ? '' : process.env.ENVIRONMENT === 'test' ? `https://${process.env.TEST_DEPLOYMENT_PREFIX}/api` : '/api';
console.log(apiPrefix)

const index = require('./routes/index');
app.use(apiPrefix, index);

const checkAuth = require('./routes/check-auth');
app.use(apiPrefix, checkAuth);

const contact = require('./routes/contact');
app.use(apiPrefix, contact);

const invoice = require('./routes/invoices');
app.use(apiPrefix, invoice);

const login = require('./routes/login');
app.use(apiPrefix, login);

const phases = require('./routes/phases');
app.use(apiPrefix, phases);

const projects = require('./routes/projects');
app.use(apiPrefix, projects);

const time_entries = require('./routes/time_entries');
app.use(apiPrefix, time_entries);

const user = require('./routes/user');
app.use(apiPrefix, user);

// Add a catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;
