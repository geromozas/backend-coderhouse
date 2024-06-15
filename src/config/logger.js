import winston from "winston";

//seteo de opciones
const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "yellow",
    warning: "magenta",
    info: "blue",
    http: "cyan",
    debug: "grey",
  },
};

winston.addColors(customLevelsOptions.colors);

//configuracion
export const devLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
  ],
});

export const prodLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.File({ filename: "./errors.log", level: "info" }),
  ],
});
