import mongoose from "mongoose";

export const usuariosModelo = mongoose.model(
  "usuarios",
  new mongoose.Schema(
    {
      nombre: String,
      email: {
        type: String,
        unique: true,
      },
      apellido: String,
      password: String,
      role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
      },
    },
    {
      timestamps: true, //agrega fecha de creación y modificación
      strict: false, //con create o un update agrego un campo adicional me lo toma
    }
  )
);
