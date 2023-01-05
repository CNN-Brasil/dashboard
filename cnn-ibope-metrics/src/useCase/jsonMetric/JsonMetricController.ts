import { Request , Response } from "express";
import { JsonMetricUseCase } from "./JsonMetricUseCase";

class JsonMetricController {
  constructor(private jsonMetriceUseCase: JsonMetricUseCase) { }
  handle(request: Request, response: Response, archive: string) {
    const json = this.jsonMetriceUseCase.GetJson(archive);
    return response.status(201).send(json);
  }
}

export { JsonMetricController }