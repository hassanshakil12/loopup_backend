const disconnectDB = require("../../configs/db");

let isShuttingDown = false;

const shutdown = async (signal, server) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  console.log(
    `\n${signal} received. Shutting down gracefully...`.bgYellow.black,
  );

  const forceShutdownTimer = setTimeout(() => {
    console.error(
      "Graceful shutdown timed out. Forcing process exit.".bgRed.white,
    );
    process.exit(1);
  }, 10000);

  forceShutdownTimer.unref();

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            return reject(error);
          }
          console.log("HTTP server closed.".bgYellow.black);
          resolve();
        });
      });
    }

    await disconnectDB();
    console.log("Application shut down successfully.".bgGreen.black);
    clearTimeout(forceShutdownTimer);

    process.exit(0);
  } catch (error) {
    clearTimeout(forceShutdownTimer);
    console.error(`${error.message}`);

    process.exit(1);
  }
};

const registerShutdownHandlers = (server) => {
  process.once("SIGINT", () => {
    shutdown("SIGINT", server);
  });

  process.once("SIGTERM", () => {
    shutdown("SIGTERM", server);
  });

  process.once("uncaughtException", (error) => {
    console.error("\nUNCAUGHT EXCEPTION:".red, error);
    shutdown("uncaughtException", server);
  });

  process.once("unhandledRejection", (error) => {
    console.error("\nUNHANDLED REJECTION:".red, error);
    shutdown("unhandledRejection", server);
  });
};

module.exports = {
  shutdown,
  registerShutdownHandlers,
};
