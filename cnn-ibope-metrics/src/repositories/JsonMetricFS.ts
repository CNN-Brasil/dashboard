import { IJsonMetric, IJsonMetricDTO } from '../interfaces/IJsonMetric';
import fs from 'fs';

class JsonMetricFS implements IJsonMetric {

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

    console.log(json);

    let channelsData: any = JSON.parse(json);
    let getJson = JSON.parse(getJsonValueFile.toString());

    Object.freeze(getJson);
    let arrCopy: any[] = [...getJson];

    if (getJson.length > 6) {

      let whileEnd = true;
      let count: number = 0;

      Object.freeze(getJson);
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
          newTimesChannels[0] = time;
          newTimesChannels[keyChannel] = Math.trunc(view);
        });

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        let date: any = `${mm}/${dd}/${yyyy}`;

        let dateLasted: any = new Date(new Date(date).setDate(new Date(date).getDate() + 1));
        const ddLasted = String(dateLasted.getDate()).padStart(2, '0');
        const mmLasted = String(dateLasted.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyyLasted = dateLasted.getFullYear();
        dateLasted = `${mmLasted}/${ddLasted}/${yyyyLasted}`;

        let newTime = new Date(`${date} ${newTimesChannels[0]}`).getTime() / 1000;
        let current = new Date(`${date} ${arrCopy[arrCopy.length - 1][0]}`).getTime() / 1000;
        let timeActual = new Date(`${date} ${arrCopy[verify][0]}`).getTime() / 1000;

        if (newTimesChannels[0] >= "00:00" && newTimesChannels[0] <= "00:05" && arrCopy[arrCopy.length - 1][0] >= "23:59") {
          newTime = new Date(`${dateLasted} ${newTimesChannels[0]}`).getTime() / 1000;
        }

        let i = 0;
        let getPositionJson = 1;

        while (i < end) {
          let countUpdate = arrCopy.length - getPositionJson;
          let updateHour = new Date(`${date} ${arrCopy[countUpdate][0]}`).getTime() / 1000;

          if (newTime === updateHour) {
            arrCopy[countUpdate] = newTimesChannels
          }
          getPositionJson++;
          i++
        }

        if (newTime > current && newTime > timeActual) {
          arrCopy.splice(arrCopy.length + 1, 0, newTimesChannels)
        }

        count++

        if (count === end) {
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

    const newTimesChannels = this.returnArrayTimes(channelsData, getJson);
    const arrayJoin = getJson.concat([newTimesChannels]);
    const stringJson = JSON.stringify(arrayJoin);
    fs.writeFile(urlJsonFile, stringJson, 'utf8', this.JsonErrors);
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
        let CNNB = elementB[1];
        let GLOBONEWSB = elementB[2];
        let RecordB = elementB[3];
        let JOVEMPANB = elementB[4];
        let bandnewsB = elementB[5]

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