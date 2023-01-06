interface ICronMetrics {
  CronRunBotIbope(): Promise<void>;
  CronRunBotYoutube(): Promise<void>;
  RunCron(): void;
}

export { ICronMetrics }