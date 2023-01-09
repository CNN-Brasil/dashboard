import { Consolidated } from "../../repositories/Consolidated";

class ConsolidatedUseCase {
    constructor(private consolidatedUseCase: Consolidated) {}

    GetConsolidated(archive: String[]): object {
        const consolidade = this.consolidatedUseCase.GetConsolidated(archive);
        return Object.assign([], consolidade);
    }
}

export { ConsolidatedUseCase }