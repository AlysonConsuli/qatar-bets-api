import Joi from "joi";
import { PaymentInsertData } from "../interfaces/createData";

export const paymentSchema = Joi.object<PaymentInsertData>({
  id: Joi.number().integer().min(1).required(),
  isPaid: Joi.boolean().required(),
});
