import { IJsonMetric, IJsonMetricDTO } from '../interfaces/IJsonMetric';
import fs from 'fs';

class JsonMetricFS implements IJsonMetric {

  SaveJson(params: IJsonMetricDTO): void {
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