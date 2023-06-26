const session = require('express-session');
const MongoStore = require('connect-mongo').default;

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: 60 * 60 * 24 * 1000}, // 1 day
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://adminbhaeussler:sHbfEvYDQQbret24@cluster0.jdcoi.mongodb.net/bhaeussler?retryWrites=true&w=majority'
        // mongoUrl: process.env.MONGODB_URI,

        //ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      }),
    })
  );
};