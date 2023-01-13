import { IJsonMetric, IJsonMetricDTO } from '../interfaces/IJsonMetric';
import fs from 'fs';

class JsonMetricFS implements IJsonMetric {

  SaveJsonYoutube(params: IJsonMetricDTO): void {
    const { archive, json } = params;
    const urlJsonFile = `${__dirname}\\..\\json\\${archive}.json`;
    const getJsonValueFile = fs.readFileSync(urlJsonFile);

    let a;
    let newChannel: number[] = [];
    let channelsData = JSON.parse(json);
    let getJson = JSON.parse(getJsonValueFile.toString());

    console.log("PASSO 6");
    channelsData.forEach((element: any) => {
      (Object.keys(element) as (keyof typeof element)[]).forEach((key, indexs) => {
        a = [];

        let keyChannel = getJson[0].indexOf(key.toString());
        newChannel[0] = element['CNNBRASIL'].time;
        newChannel[keyChannel] =  Math.trunc(element[key].view);
        a.push(newChannel);
      });
    });

    getJson = getJson.concat(a);
    getJson = JSON.stringify(getJson);
    console.log("PASSO 7")
    fs.writeFile(urlJsonFile, getJson, 'utf8', this.JsonErrors);
    var endTime = performance.now()
    console.log(`Call to doSomething took END ${endTime} milliseconds`)
  }

  SaveJsonIbope(params: IJsonMetricDTO): void {
    try {
      const { archive, json } = params;
      const urlJsonFile = `${__dirname}\\..\\json\\${archive}.json`;
      const getJsonValueFile = fs.readFileSync(urlJsonFile);
      let channelsData = JSON.parse(json);
      let getJson = JSON.parse(getJsonValueFile.toString());

      Object.freeze(getJson);
      let arrCopy: any[] = [...getJson];

      if (getJson.length > 6) {

        let whileEnd = true;
        let count: number = 0;
        Object.freeze(getJson);

        console.log(channelsData)
        const end = channelsData[0].RECORDNEWS.share.length;

        while (whileEnd) {
          let position: number = getJson.length - count;
          const newTimesChannels: any[] = [];
          const countShare = count;

          channelsData.forEach((element: any, index: any) => {
            const c: any = (Object.keys(channelsData[index]) as (keyof typeof channelsData[])[]);
            let keyChannel = getJson[0].indexOf(c.toString());
            const view = element[c].share[countShare];
            const time = element[c].time[countShare];
            newTimesChannels[0] = time;
            newTimesChannels[keyChannel] =  Math.trunc(view);
          });

          arrCopy.concat([this.returnArrayTimes(channelsData, getJson)]);

          console.log(position);
          console.log(newTimesChannels)
          arrCopy[position] = newTimesChannels;
          count++;

          if (count === end) {
            whileEnd = false;
          }
        }
        console.log('cope fora while');
        const stringJson = JSON.stringify(arrCopy);
        fs.writeFile(urlJsonFile, stringJson, 'utf8', this.JsonErrors);
        return;
      }

      const newTimesChannels = this.returnArrayTimes(channelsData, getJson);
      console.log('fora while');
      console.log(newTimesChannels)
      const arrayJoin = getJson.concat([newTimesChannels]);
      const stringJson = JSON.stringify(arrayJoin);
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

  returnArrayTimes(a: [], b: string[]) {
    const newTimesChannels: number[] = [];
    a.forEach((element: any) => {
      const c: any = (Object.keys(element) as (keyof typeof element)[]);
      const keyChannel = b[0].indexOf(c.toString());
      const view = parseFloat(element[c].share[0]);
      const time = element[c].time[0];
      newTimesChannels[0] = time;
      newTimesChannels[keyChannel] =  Math.trunc( view );
    });
    return newTimesChannels;
  }

}

export { JsonMetricFS }