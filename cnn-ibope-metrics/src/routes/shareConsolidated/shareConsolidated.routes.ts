import { Router } from 'express';
import { shareConsolidatedController } from '../../useCase/share';

const shareConsolidated = Router();

shareConsolidated.get("/shareConsolidated", (request, response) => {
    shareConsolidatedController.handler(['ibope-metric', 'youtube-metric'], response);
});

export { shareConsolidated };