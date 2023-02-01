/** 
 * Routes management
 * Project: API for loaded the data of audience
 * Definitions by: Sergio Sposito
 */
import { Router } from "express";
import { botRoutes } from "./youtube/youtube.routes";
import { ibopeInit } from "./ibope/ibope.routes";
import { consolidated } from "./consolidated/consolidated.routes";
import { shareConsolidated } from "./shareConsolidated/shareConsolidated.routes";
import { authenticateUser } from "./authenticate/autenticate.route";

const routes = Router();

/** 
 * View data return collected from youtube
 */
routes.use("/view", botRoutes);
/** 
 * View data return collected from kantar ibope
 */
routes.use("/view", ibopeInit);
/** 
 * View sum data return collected from kantar ibope  and youtube
 */
routes.use("/view", consolidated);
/** 
 * View data return share
 */
routes.use("/view", shareConsolidated);
/** 
 * route Authentication at the ldap CNN
 */
routes.use("/authenticate", authenticateUser);

export { routes }