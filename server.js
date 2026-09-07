require("colors");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const mongooseSanitize = require("express-mongo-sanitize");
const Boom = require("@hapi/boom");

// middlewares
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");

// Configs
const { env, connectDB } = require("./configs");

// Constants
const message = require("./constants/MESSAGE");

// Utils
const { registerShutdownHandlers } = require("./utils/shutdown");

const app = express();

// app.use(helmet());
app.use(rateLimiter);
app.use(mongooseSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(`/api/${env.API.VERSION}`, require("./routes"));

app.use((req, res, next) => {
  next(Boom.notFound(message.error.server.routeNotFound));
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(env.PORT, () => {
      console.log(`Server listening on port ${env.PORT}`);
      console.log(`Server environment: ${env.NODE.ENV}`);
    });

    registerShutdownHandlers(server);
  } catch (error) {
    console.error(`${error.message}`.red);
    process.exit(1);
  }
};

startServer();
