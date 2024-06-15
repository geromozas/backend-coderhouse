import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  code: {
    type: String,
    require: true,
  },
  purchase_datatime: {
    type: Date,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  purchaser: {
    type: String,
    require: true,
  },
});

export const TicketModel = new mongoose.model("Ticket", TicketSchema);
