import { JsonMetricFS } from "../../repositories/JsonMetricFS";

class JsonMetricUseCase {
    constructor(private jsonMetricUseCase: JsonMetricFS) {}
   
    GetJson(archive: string): string {
        const json = this.jsonMetricUseCase.GetJson(archive);
        return json;
    }
}

export { JsonMetricUseCase }