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




// const contactEmail = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   // logger: true,
//   auth: {
//       user: process.env.MAIL,
//       pass: process.env.MAIL_PASSWORD
//   },
//   secure: true
// });

// //TEST EMAIL
// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to send");
//   }
// });



// default value for title local
app.locals.title = 'Häußler Architekt';



// ROUTES
const apiPrefix = '/api'

const index = require('./routes/index');
app.use(apiPrefix, index);

const checkAuth = require('./routes/check-auth');
app.use(apiPrefix, checkAuth);

const contact = require('./routes/contact');
app.use(apiPrefix, contact);

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

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
