import { JsonMetricFS } from "./JsonMetricFS";

class Consolidated implements Consolidated {
  GetConsolidated(archive: String[]): any {
    const jsonMetric = new JsonMetricFS();
    let object: [
      "Horário",
      "CNNBRASIL",
      "GLOBONEWS",
      "RECORDNEWS",
      "JOVEMPANNEWS",
      "BANDNEWS",
      "TOTALPAYTV"
    ] = [
        "Horário",
        "CNNBRASIL",
        "GLOBONEWS",
        "RECORDNEWS",
        "JOVEMPANNEWS",
        "BANDNEWS",
        "TOTALPAYTV"
      ];

    let ibope: any = jsonMetric.GetJson(archive[0].toString());
    let youtube: any = jsonMetric.GetJson(archive[1].toString());

    let youtubeModified = [];
    const youtubeFilter = youtube.splice(1)
    const ibopeFilter = ibope.splice(1)

    youtubeFilter.forEach((elementA: any, key: number) => {
      const horaA = elementA[0];

      let CNN = elementA[1];
      let GLOBONEWS = elementA[2];
      let Record = elementA[3];
      let JOVEMPAN = elementA[4];
      let bandnews = elementA[5];
      let TOTALPAYTV = elementA[6];

      for (let index = 0; index < ibopeFilter.length; index++) {
        const elementB = ibopeFilter[index];
        const horaB = elementB[0];
        let CNNB = elementB[1];
        let GLOBONEWSB = elementB[2];
        let RecordB = elementB[3];
        let JOVEMPANB = elementB[4];
        let bandnewsB = elementB[5];
        let TOTALPAYTVB = elementB[6];

        if (horaA === horaB) {
          elementA[1] = Math.trunc(CNN + CNNB);
          elementA[2] = Math.trunc(GLOBONEWS + GLOBONEWSB);
          elementA[3] = Math.trunc(Record + RecordB);
          elementA[4] = Math.trunc(JOVEMPAN + JOVEMPANB);
          elementA[5] = Math.trunc(bandnews + bandnewsB);
          elementA[6] = Math.trunc(TOTALPAYTV + TOTALPAYTVB);
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