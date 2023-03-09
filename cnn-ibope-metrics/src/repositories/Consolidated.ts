import { JsonMetricFS } from "./JsonMetricFS";

/** 
 * Sum data collected from youtube and kantar ibope
 * Project: API for loaded the data of audience
 * Definitions by: Sergio Sposito
 */
class Consolidated implements Consolidated {
  GetConsolidated(archive: String[]): any {
    const jsonMetric = new JsonMetricFS();
    let object: [
      "Horário",
      "CNNBRASIL",
      "GLOBONEWS",
      "JOVEMPANNEWS",
      "BANDNEWS"
    ] = [
        "Horário",
        "CNNBRASIL",
        "GLOBONEWS",
        "JOVEMPANNEWS",
        "BANDNEWS"
      ];

    let ibope: any = jsonMetric.GetJson(archive[0].toString());
    let youtube: any = jsonMetric.GetJson(archive[1].toString());

    let youtubeModified = [];
    const youtubeFilter = youtube.splice(1)
    const ibopeFilter = ibope.splice(1)

    youtubeFilter.forEach((elementA: any, key: number) => {
      const horaA = elementA[0];

      let CNN = elementA[1];
      let JOVEMPAN = elementA[2];

      for (let index = 0; index < ibopeFilter.length; index++) {
        const elementB = ibopeFilter[index];
        const horaB = elementB[0];
        
        let CNNB = elementB[1];
        let GLOBONEWSB = elementB[2];
        let JOVEMPANB = elementB[3];
        let bandnewsB = elementB[4];

        if (horaA === horaB) {
          elementA[1] = Math.trunc(CNN + CNNB);
          elementA[2] = Math.trunc(0 + GLOBONEWSB);
          elementA[3] = Math.trunc(JOVEMPAN + JOVEMPANB);
          elementA[4] = Math.trunc(0 + bandnewsB);
          
          youtubeModified.push(elementA)
          continue;
        }
      }

    })

    youtubeModified.unshift(object);
    return youtubeModified;

  }
}

export { Consolidated };