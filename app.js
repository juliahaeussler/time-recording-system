require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
//const favicon = require('serve-favicon');
//const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

// Connects to the database
const connectDB = require('./db/db');
connectDB();

const session = require('express-session');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build')));


require('./configs/session.config')(app);



// default value for title local
app.locals.title = 'Häußler Architekt';



// ROUTES
const apiPrefix = '/api'

const index = require('./routes/index');
app.use(apiPrefix, index);

const auth = require('./routes/auth');
app.use(apiPrefix, auth);

const phases = require('./routes/phases');
app.use(apiPrefix, phases);

const projects = require('./routes/projects');
app.use(apiPrefix, projects);

const time_entries = require('./routes/time_entries');
app.use(apiPrefix, time_entries);

const time = require('./routes/time');
app.use(apiPrefix, time);

const analysis = require('./routes/analysis');
app.use(apiPrefix, analysis);

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
