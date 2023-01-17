import { Consolidated } from "./Consolidated";

class ShareConsolidated {

    private consolidated = new Consolidated();

    GetShareJson(archive: String[]): object {
        let object:object;
        try {
            object = this.consolidated.GetConsolidated(archive);
            return object;
        } catch (error) {
            object = { message: 'Error in object' };
            return object;
        }
    }
}

export { ShareConsolidated }