import { MongoTicketManager } from "../dao/mongoManagers/mongoTicketManager.js";
import { v4 } from "uuid";

const ticketManager = new MongoTicketManager();

export const createTicket = async (amount, purchaser) => {
  try {
    if (!amount || !purchaser) throw new Error("No se puede crear el ticket");
    const code = v4();
    const purchaseDateTime = new Date();
    const ticket = ticketManager.createTicket({
      amount,
      purchaser,
      code,
      purchaseDateTime,
    });
    return ticket;
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    throw new Error(error.message);
  }
};
