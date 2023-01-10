interface ICronMetrics {
  CronRunBotIbope(): Promise<object>;
  CronRunBotYoutube(): Promise<object>;
  RunCron(): void;
}

export { ICronMetrics }