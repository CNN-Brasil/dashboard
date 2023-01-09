import { Consolidated } from "../../repositories/Consolidated";
import { ConsolidatedController } from "./ConsolidatedController";
import { ConsolidatedUseCase } from "./ConsolidatedUseCase";

const consolidated = new Consolidated();
const consolidatedUseCase = new ConsolidatedUseCase(consolidated);
const consolidatedController = new ConsolidatedController(consolidatedUseCase);

export { consolidatedController }