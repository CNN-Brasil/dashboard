import { JsonMetricFS } from "./JsonMetricFS";

class Consolidated implements Consolidated {
  GetConsolidated(archive: String[]): any {
    const jsonMetric = new JsonMetricFS();
    let object:[[
      "Horário",
      "CNNBRASIL",
      "GLOBONEWS",
      "RECORDNEWS",
      "JOVEMPANNEWS",
      "BANDNEWS"
      ]] = [[
        "Horário",
        "CNNBRASIL",
        "GLOBONEWS",
        "RECORDNEWS",
        "JOVEMPANNEWS",
        "BANDNEWS"
      ]];
    let ibope:string = jsonMetric.GetJson(archive[0].toString());
    let youtube:string = jsonMetric.GetJson(archive[1].toString());

    ibope = JSON.parse(ibope).splice(1);
    youtube = JSON.parse(youtube).splice(1);

    let count = 0;

    for (let index = 0; index < ibope.length; index++) {
      const element:any = ibope[index];
      var sum:any = element?.map(function (num:any, idx:any) {
        if (0 !== idx) {
          if (0 !== Object.keys(Object.assign([], youtube[count])).length) {
            return num + youtube[count][idx];
          }
          return num;
        }  
        return num
      });

      object.push(sum);
    }
 

    return object;
  }
}


export { Consolidated };
