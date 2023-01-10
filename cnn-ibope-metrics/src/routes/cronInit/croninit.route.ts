import { Router } from 'express';
import { cronMetricsController } from '../../useCase/cronMetric';

const cronInit = Router();

cronInit.get("/", (request, response) => {
    request.setMaxListeners(0);
    cronMetricsController.handler(request, response);
});

export { cronInit };