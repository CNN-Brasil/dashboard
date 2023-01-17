import { ShareConsolidated } from "../../repositories/ShareConsolidated";
import { ShareConsolidatedController } from "./ShareConsolidatedController";
import { ShareConsolidatedUseCase } from "./ShareConsolidatedUseCase";

const shareConsolidated = new ShareConsolidated();
const shareConsolidatedUseCase = new ShareConsolidatedUseCase(shareConsolidated);
const shareConsolidatedController = new ShareConsolidatedController(shareConsolidatedUseCase); 

export { shareConsolidatedController };