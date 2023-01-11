interface IJsonMetricDTO {
  json: string;
  archive: string;
}

interface IJsonMetric {
  SaveJsonIbope(params: IJsonMetricDTO): void;
  SaveJsonYoutube(params: IJsonMetricDTO): void;
  GetJson(archive: string): string;
  JsonErrors(err: string): string
}

export { IJsonMetric, IJsonMetricDTO }
