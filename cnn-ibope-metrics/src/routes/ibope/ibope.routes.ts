import { Router } from 'express';
import { jsonMetricController } from '../../useCase/jsonMetric';
const ibopeInit = Router();

ibopeInit.get("/ibope", (request, response) => {
    jsonMetricController.handle(request, response, 'ibope-metric');
});

export { ibopeInit };