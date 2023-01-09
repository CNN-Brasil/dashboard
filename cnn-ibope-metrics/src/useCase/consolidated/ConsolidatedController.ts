import { Response } from 'express';
import { ConsolidatedUseCase } from "./ConsolidatedUseCase";

class ConsolidatedController {
  constructor(private consolidatedUseCase: ConsolidatedUseCase) { }

  handler(archive: String[], response: Response): object {
    const json = this.consolidatedUseCase.GetConsolidated(archive);
    return response.status(201).json(json);
  }
}

export { ConsolidatedController }