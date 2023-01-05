import { Router } from "express";
import { botRoutes } from "./youtube/youtube.routes";
import { cronInit } from "./cronInit/croninit.route";
import { ibopeInit } from "./ibope/ibope.routes";

const routes = Router();

routes.use("/view", botRoutes);
routes.use("/cron", cronInit);
routes.use("/view", ibopeInit);

export { routes }