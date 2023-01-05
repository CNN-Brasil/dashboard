interface IJsonMetricDTO {
  key: string;
  view: string;
  time: string;
}

interface IJsonMetric {
  SaveJson(params: IJsonMetricDTO, dir: string): void;
  GetJson(archive: string): string;
  JsonErrors(err: string): string
}

export { IJsonMetric, IJsonMetricDTO }
