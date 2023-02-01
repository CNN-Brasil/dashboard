import { Request, Response } from "express";
import { CronMetricUseCase } from "./CronMetricUseCase";

class CronMetricController {
    constructor(private cronMetricUseCase: CronMetricUseCase) {}

    handler() {
      this.cronMetricUseCase.CronMetrics();
    }
}

export { CronMetricController }