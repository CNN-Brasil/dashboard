import { CronMetrics } from "../../repositories/CronMetrics";
import { CronMetricController } from "./CronMetricController";
import { CronMetricUseCase } from "./CronMetricUseCase";


const cronMetrics = new CronMetrics();
const cronMetricsUseCase = new CronMetricUseCase(cronMetrics);
const cronMetricsController = new CronMetricController(cronMetricsUseCase);

export { cronMetricsController }