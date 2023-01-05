interface ICronMetrics {
  CronRunBot(): Promise<void>;
  RunCron(): void;
}

export { ICronMetrics }