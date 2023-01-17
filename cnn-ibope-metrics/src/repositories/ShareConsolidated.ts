import { Consolidated } from "./Consolidated";

class ShareConsolidated {

    private consolidated = new Consolidated();

    GetShareJson(archive: String[]): object {
        let object:object[];
        try {
            object = this.consolidated.GetConsolidated(archive);
            let endPostion:any = object.at(-1);
            endPostion =  endPostion.splice(0,0);
            
            let result = endPostion.reduce((a:any, b:any) => {
                return a + b;
            });

            return { result };
        } catch (error) {
            object = [{ message: 'Error in object' }];
            return object;
        }
    }
}

export { ShareConsolidated }