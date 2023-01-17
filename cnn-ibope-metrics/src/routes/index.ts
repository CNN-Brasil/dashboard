import { Router } from "express";
import { botRoutes } from "./youtube/youtube.routes";
import { cronInit } from "./cronInit/croninit.route";
import { ibopeInit } from "./ibope/ibope.routes";
import { consolidated } from "./consolidated/consolidated.routes";
import { shareConsolidated } from "./shareConsolidated/shareConsolidated.routes";

const routes = Router();

routes.use("/view", botRoutes);
routes.use("/cron", cronInit);
routes.use("/view", ibopeInit);
routes.use("/view", consolidated);
routes.use("/view", shareConsolidated);

export { routes }