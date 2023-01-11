import { IJsonMetric, IJsonMetricDTO } from '../interfaces/IJsonMetric';
import fs from 'fs';

class JsonMetricFS implements IJsonMetric {

  SaveJsonYoutube(params: IJsonMetricDTO): void {
    const { archive, json } = params;
    const urlJsonFile = `${__dirname}\\..\\json\\${archive}.json`;
    const getJsonValueFile = fs.readFileSync(urlJsonFile);

    let a;
    let newChannel: string[] = [];
    let channelsData = JSON.parse(json);
    let getJson = JSON.parse(getJsonValueFile.toString());

    channelsData.forEach((element: any) => {
      (Object.keys(element) as (keyof typeof element)[]).forEach((key, indexs) => {
        a = [];

        let keyChannel = getJson[0].indexOf(key.toString());
        newChannel[0] = element[key].time;
        newChannel[keyChannel] = element[key].view;
        a.push(newChannel);
      });
    });

    getJson = getJson.concat(a);
    getJson = JSON.stringify(getJson);
    fs.writeFile(urlJsonFile, getJson, 'utf8', this.JsonErrors);
  }

  SaveJsonIbope(params: IJsonMetricDTO): void {
    try {
      const { archive, json } = params;
      const urlJsonFile = `${__dirname}\\..\\json\\${archive}.json`;
      const getJsonValueFile = fs.readFileSync(urlJsonFile);

      let newChannel: any = [];
      let channelsData = JSON.parse(json);
      let getJson = JSON.parse(getJsonValueFile.toString());
      Object.freeze(getJson);
      let arrCopy: String[] = [...getJson];

      if (5 <= getJson.length) {

        let i: number = 0;
        for (let index = 0; index < channelsData.length; index) {

          const element = channelsData[i];
          let position: number = arrCopy.length - index;

          if (element) {
            (Object.keys(element) as (keyof typeof element)[]).forEach((key) => {
              

              if (i === 0) { newChannel[0] = element[key].time[index]; }

              const view = parseInt(element[key].share[index]);
              let keyChannel = getJson[0].indexOf(key.toString());
              newChannel[keyChannel] = view;
            });
          }

          if (i === channelsData.length) {
            arrCopy[position] = newChannel;
            
            const stringJson = JSON.stringify(arrCopy);
            fs.writeFile(urlJsonFile, stringJson, 'utf8', this.JsonErrors);
            
            newChannel = [];
            index++;
            i = 0;
            continue;
          }

          if (index === channelsData.length) {
            break;
          }

          i++;
        }
      }

      let arrJoin: String[] = [];
      channelsData.forEach((element: any, count: any) => {
        (Object.keys(element) as (keyof typeof element)[]).forEach((key, indexs) => {
          arrJoin = [];

          let keyChannel = arrCopy[0].indexOf(key.toString());
          newChannel[0] = newChannel[0] = element[key].time[0];
          newChannel[keyChannel] = parseInt(element[key].share[0]);
          arrJoin.push(newChannel);
        });
      });

      arrCopy = getJson.concat(arrJoin);
      const stringJson = JSON.stringify(arrCopy);
      fs.writeFile(urlJsonFile, stringJson, 'utf8', this.JsonErrors);

    } catch (error) {
      console.log(error)
    }
  }

  JsonErrors(err: any): string {
    if (err) {
      return 'ERRR';
    }
    return 'Save';
  }

  GetJson(archive: string): string {
    const urlJsonFile = `${__dirname}\\..\\json\\${archive}.json`;
    const getJsonValueFile = fs.readFileSync(urlJsonFile);
    return getJsonValueFile.toString();
  }

}

export { JsonMetricFS }