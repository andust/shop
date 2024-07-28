import { Router } from "express";
import { getOrders } from "../../controllers/order.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.route("/").get(auth, getOrders);

export default router;
