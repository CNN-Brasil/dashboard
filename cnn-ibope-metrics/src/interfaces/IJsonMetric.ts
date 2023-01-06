interface IJsonMetricDTO {
  json: string;
  archive: string;
}

interface IJsonMetric {
  SaveJson(params: IJsonMetricDTO): void;
  GetJson(archive: string): string;
  JsonErrors(err: string): string
}

export { IJsonMetric, IJsonMetricDTO }
