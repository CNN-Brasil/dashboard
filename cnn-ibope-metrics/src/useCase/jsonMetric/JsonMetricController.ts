import { Response } from "express";
import { JsonMetricUseCase } from "./JsonMetricUseCase";

class JsonMetricController {
  constructor(private jsonMetriceUseCase: JsonMetricUseCase) { }
  handle(archive: string, response: Response) {
    const json = this.jsonMetriceUseCase.GetJson(archive);
    return response.status(201).send(json);
  }
}

export { JsonMetricController }