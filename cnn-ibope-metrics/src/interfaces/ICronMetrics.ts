interface ICronMetrics {
  CronRunBotIbope(): Promise<void>;
  CronRunBotYoutube(): Promise<object>;
  RunCron(): void;
}

export { ICronMetrics }