import { IJsonMetric, IJsonMetricDTO } from '../interfaces/IJsonMetric';
import fs from 'fs';
import { ConvertDateStrftime } from '../includes/ConvertDateStrftime';

class JsonMetricFS implements IJsonMetric {

  private convertDateStrftime = new ConvertDateStrftime();

  SaveJsonYoutube(params: IJsonMetricDTO): void {
    const { archive, json } = params;
    const urlJsonFile = `${__dirname}/../json/${archive}.json`;
    const getJsonValueFile = fs.readFileSync(urlJsonFile);

    let a;
    let newChannel: number[] = [];
    let channelsData = JSON.parse(json);
    let getJson = JSON.parse(getJsonValueFile.toString());

    channelsData.forEach((element: any) => {
      (Object.keys(element) as (keyof typeof element)[]).forEach((key, indexs) => {
        a = [];

        let keyChannel = getJson[0].indexOf(key.toString());
        newChannel[0] = element['CNNBRASIL'].time;
        newChannel[keyChannel] = Math.trunc(element[key].view);
        a.push(newChannel);
      });
    });

    getJson = getJson.concat(a);

    if (361 < getJson.length) {
      getJson.splice(1, 1);
    }

    getJson = JSON.stringify(getJson);
    fs.writeFile(urlJsonFile, getJson, 'utf8', this.JsonErrors);
  }

  SaveJsonIbope(params: IJsonMetricDTO): void {

    const { archive, json } = params;
    const urlJsonFile = `${__dirname}/../json/${archive}.json`;
    const getJsonValueFile = fs.readFileSync(urlJsonFile);
    const midnightCurrent = new Date().setHours(0, 0, 0, 0) / 1000;

    let channelsData: any = JSON.parse(json);;
    let getJson = JSON.parse(getJsonValueFile.toString());

    Object.freeze(getJson);

    let arrCopy: any[] = [...getJson];
    let whileEnd = true;
    let count: number = 0;

    const end = channelsData[0].RECORDNEWS.share.length;

    while (whileEnd) {
      let verify: number = getJson.length - 1;
      const newTimesChannels: any[] = [];
      const countShare = count;

      channelsData.forEach((element: any, index: any) => {
        const c: any = (Object.keys(channelsData[index]) as (keyof typeof channelsData[])[]);
        let keyChannel = getJson[0].indexOf(c.toString());
        const view = element[c].share[countShare];
        const time = element[c].time[countShare];
        newTimesChannels[0] = this.convertDateStrftime.convertDate(time);
        newTimesChannels[keyChannel] = Math.trunc(view);
      });

      let newTime = newTimesChannels[0];
      let current = arrCopy[arrCopy.length - 1][0];
      let timeActual = arrCopy[verify][0];

      let i = 0;
      let getPositionJson = 1;

      if (current >= midnightCurrent && this.convertDateStrftime.getDiffBetweenHours(current, newTime) >= 23) {
        count++;
        if (count === end || 0 === end) {
          whileEnd = false;
        }
        continue;
      }

      while (i < end) {
        if (arrCopy.length > 1) {
          let countUpdate = arrCopy.length - getPositionJson;
          let updateHour = arrCopy[countUpdate][0];

          if (newTime === updateHour) {
            arrCopy[countUpdate] = newTimesChannels
          }
          getPositionJson++;
        }
        i++
      }

      if (arrCopy.length <= 1) {
        arrCopy.push(newTimesChannels)
      }

      if (newTime > current && newTime > timeActual) {
        console.log('Time Already')
        arrCopy.splice(arrCopy.length + 1, 0, newTimesChannels)
      }

      count++

      if (count === end || 0 === end) {
        whileEnd = false;
      }
    }

    if (361 < arrCopy.length) {
      arrCopy.splice(1, 1);
    }

    const stringJson = JSON.stringify(arrCopy);
    fs.writeFile(urlJsonFile, stringJson, 'utf8', this.JsonErrors);
    return;

  }

  JsonErrors(err: any): string {
    if (err) {
      return 'ERRR';
    }
    return 'Save';
  }

  GetJson(archive: string): object {

    let object: [
      "Horário",
      "CNNBRASIL",
      "GLOBONEWS",
      "RECORDNEWS",
      "JOVEMPANNEWS",
      "BANDNEWS"
    ] = [
        "Horário",
        "CNNBRASIL",
        "GLOBONEWS",
        "RECORDNEWS",
        "JOVEMPANNEWS",
        "BANDNEWS"
      ];

    let youtubeFile: string = `${__dirname}/../json/youtube-metric.json`;
    let ibopeFile: string = `${__dirname}/../json/ibope-metric.json`;

    youtubeFile = fs.readFileSync(youtubeFile).toString();
    ibopeFile = fs.readFileSync(ibopeFile).toString();

    let youtube = JSON.parse(youtubeFile);
    let ibope = JSON.parse(ibopeFile);
    let youtubeModified = [];

    const youtubeFilter = youtube.splice(1);
    const ibopeFilter = ibope.splice(1);
    let filter = youtubeFilter;

    (archive === 'ibope-metric') ? filter = ibopeFilter : filter = youtubeFilter;

    filter.forEach((elementA: any, key: number) => {
      
      const horaA = elementA[0];

      let CNN = elementA[1];
      let GLOBONEWS = elementA[2];
      let Record = elementA[3];
      let JOVEMPAN = elementA[4];
      let bandnews = elementA[5]

      for (let index = 0; index < ibopeFilter.length; index++) {
        const elementB = ibopeFilter[index];
        const horaB = elementB[0];

        if (horaA === horaB) {
          elementA[1] = Math.trunc(CNN);
          elementA[2] = Math.trunc(GLOBONEWS);
          elementA[3] = Math.trunc(Record);
          elementA[4] = Math.trunc(JOVEMPAN);
          elementA[5] = Math.trunc(bandnews);
          youtubeModified.push(elementA)
          continue;
        }
      }

    })

    youtubeModified.unshift(object);
    return youtubeModified;

  }

  returnArrayTimes(a: [], b: string[]) {
    const newTimesChannels: number[] = [];
    a.forEach((element: any) => {
      const c: any = (Object.keys(element) as (keyof typeof element)[]);
      const keyChannel = b[0].indexOf(c.toString());
      const view = parseFloat(element[c].share[0]);
      const time = element[c].time[0];
      newTimesChannels[0] = time;
      newTimesChannels[keyChannel] = Math.trunc(view);
    });
    return newTimesChannels;
  }

}

export { JsonMetricFS }