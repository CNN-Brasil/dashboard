import { Router } from 'express';
import { consolidatedController } from '../../useCase/consolidated';

const consolidated = Router();

consolidated.get("/consolidated", (request, response) => {
    consolidatedController.handler(['ibope-metric', 'youtube-metric'], response);
});

export { consolidated };