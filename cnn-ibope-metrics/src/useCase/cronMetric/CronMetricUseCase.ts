import { CronMetrics } from "../../repositories/CronMetrics";

class CronMetricUseCase {
    constructor(private cronMetric: CronMetrics) {}

    CronMetrics() {
        this.cronMetric.RunCron();
    }
}

export { CronMetricUseCase };