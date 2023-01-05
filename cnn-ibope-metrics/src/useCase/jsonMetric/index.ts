import { JsonMetricFS } from "../../repositories/JsonMetricFS";
import { JsonMetricController } from "./JsonMetricController";
import { JsonMetricUseCase } from "./JsonMetricUseCase";


const jsonMetric = new JsonMetricFS();
const jsonMetricUseCase = new JsonMetricUseCase(jsonMetric);
const jsonMetricController = new JsonMetricController(jsonMetricUseCase);

export { jsonMetricController }