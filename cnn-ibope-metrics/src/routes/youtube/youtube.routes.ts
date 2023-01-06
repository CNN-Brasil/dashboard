import { Router } from 'express';
import { jsonMetricController } from '../../useCase/jsonMetric';

const botRoutes = Router();
const cors = require('cors');

botRoutes.get("/youtube", cors(), (request, response) => {
  jsonMetricController.handle(request, response, 'youtube-metric');
});

export { botRoutes };