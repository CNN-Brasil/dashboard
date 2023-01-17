import { ShareConsolidated } from "../../repositories/ShareConsolidated";


class ShareConsolidatedUseCase {
    constructor(private shareConsolidated: ShareConsolidated) {}
    GetShareJson(archive: String[]): object {
        let object: object;

        try {
            object = this.shareConsolidated.GetShareJson(archive); 
            return object;  
        } catch (error) {
            object = { message: 'Error in object' };
            return object;   
        }
    }
}

export  { ShareConsolidatedUseCase }