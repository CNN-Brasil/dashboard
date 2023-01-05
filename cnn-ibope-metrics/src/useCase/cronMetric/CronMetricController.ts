import { Request, Response } from "express";
import { CronMetricUseCase } from "./CronMetricUseCase";

class CronMetricController {
    constructor(private cronMetricUseCase: CronMetricUseCase) {}

    handler(request: Request, response: Response) {
      this.cronMetricUseCase.CronMetrics();
      response.status(201).send();
    };
}

export { CronMetricController }