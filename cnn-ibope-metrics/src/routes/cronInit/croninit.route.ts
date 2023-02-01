import { cronMetricsController } from '../../useCase/cronMetric';

export const initCrons = () => {
    cronMetricsController.handler();
}