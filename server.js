require("colors");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const mongooseSanitize = require("express-mongo-sanitize");
const Boom = require("@hapi/boom");
const cookieParser = require("cookie-parser");

// middlewares
const errorHandler = require("./middlewares/errorHandler");

// Configs
const { connectDB } = require("./configs/db");
const env = require("./configs/env");

// Constants
const { MESSAGE: message } = require("./common/constants");

// Utils
const { registerShutdownHandlers } = require("./common/utils/shutdown");

const app = express();

// app.use(helmet());
app.use(mongooseSanitize());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(`/api/${env.API.VERSION}`, require("./modules"));

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
