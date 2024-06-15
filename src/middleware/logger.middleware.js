// import { program } from "../config/commander.config.js";
// import { prodLogger, devLogger } from "../config/logger.js";

// export const addLogger = (req, res, next) => {
//   if (program.opts().mode === "production") {
//     req.logger = prodLogger;
//   } else {
//     req.logger = devLogger;
//   }
//   next();
// };

export const addLogger = (req, res, next) => {
  if (config.environment === "production") {
    req.logger = prodLogger;

    req.logger.http(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.warning(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.debug(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
  } else {
    req.logger = devLogger;

    req.logger.http(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.warning(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.debug(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
  }
  next();
};
