import mongoose from "mongoose";
import { config } from "../../config/config.js";

export const dataBaseConnection = () => {
  mongoose
    .connect(config.dbConnection)
    .then(() => {
      console.log("Connected database");
    })
    .catch((err) => {
      console.log(err);
    });
};
