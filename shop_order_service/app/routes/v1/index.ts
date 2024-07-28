import { Router } from "express";

import orderRoute from "./orders.route";

const router = Router();

const defaultRoutes = [
  {
    path: "/orders",
    route: orderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
