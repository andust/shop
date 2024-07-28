import { constants } from "http2";
import express from "express";
import { Order } from "../models/order.model";
import logger from "../config/logger";
import { AuthRequest } from "../middlewares/auth";

export const getOrders: express.RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    console.log(req.userId);
    
    return res.status(constants.HTTP_STATUS_OK).send(await Order.find({}));
  } catch (error) {
    logger.error(error);
    return res.status(constants.HTTP_STATUS_BAD_REQUEST);
  }
};
