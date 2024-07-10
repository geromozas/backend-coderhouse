import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "premium"],
      default: "user",
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      default: null,
    },
    documents: {
      type: [DocumentSchema],
      default: null,
    },
    last_connection: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, //agrega fecha de creación y modificación
    strict: false, //con create o un update agrego un campo adicional me lo toma
  }
);

export const UserModel = mongoose.model("User", UserSchema);
