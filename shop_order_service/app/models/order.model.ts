import { model, Schema } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
});

export const Order = model("Order", orderSchema);
