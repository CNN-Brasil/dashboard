import { Router } from 'express';
import { jsonMetricController } from '../../useCase/jsonMetric';

const botRoutes = Router();

botRoutes.get("/youtube", (request, response) => {
  jsonMetricController.handle(request, response, 'youtube-metric');
});

export { botRoutes };