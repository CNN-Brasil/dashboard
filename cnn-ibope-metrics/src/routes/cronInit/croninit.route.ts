import { Router } from 'express';
import { cronMetricsController } from '../../useCase/cronMetric';

const cronInit = Router();

cronInit.get("/", (request, response) => {
    cronMetricsController.handler(request, response);
});

export { cronInit };