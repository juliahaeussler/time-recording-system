const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

module.exports = (app) => {
  const mongoClientPromise = new Promise((resolve) => {
    mongoose.connection.on("connected", () => {
      const client = mongoose.connection.getClient();
      resolve(client);
    });
  });

  const sessionStore = MongoStore.create({
    clientPromise: mongoClientPromise,
    mongoUrl: process.env.MONGODB_URI
    // dbName: "myDb",
    // collection: "sessions"
  });

  app.use(
    session({
      secret: 'trs123',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60 * 60 * 24 * 1000 }, // 1 day
      store: sessionStore,
      // store: MongoStore.create({
      //   mongoUrl:
      //   // mongoUrl: process.env.MONGODB_URI,

      //ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      // }),
    })
  );
};
