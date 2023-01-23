import { Consolidated } from "./Consolidated";

class ShareConsolidated {

    private consolidated = new Consolidated();

    GetShareJson(archive: String[]): object {
        let object: any;
        try {
            object = this.consolidated.GetConsolidated(archive);
            let i: number = object.length - 1;
            let endPostion = [...object[i]];
            endPostion = endPostion.splice(1);

            let result: any = endPostion.reduce((a: any, b: any) => {
                return a + b;
            });

            let map: any = endPostion.map((a: number, b: number) => {
                const resultSum: any = a / parseInt(result) * 100
                return parseFloat(parseFloat(resultSum).toFixed(2));
            });

            let final = [
                [
                    "Horário",
                    "CNNBRASIL",
                    "GLOBONEWS",
                    "RECORDNEWS",
                    "JOVEMPANNEWS",
                    "BANDNEWS",
                    "TOTALPAYTV"
                ]].concat([map]);
            return final;
        } catch (error) {
            object = [{ message: 'Error in object' }];
            return object;
        }
    }
}

export { ShareConsolidated }