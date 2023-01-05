import { IJsonMetric, IJsonMetricDTO } from '../interfaces/IJsonMetric';
import fs from 'fs';

class JsonMetricFS implements IJsonMetric {
  
  SaveJson(params: IJsonMetricDTO, dir: string): void {
    const { key, time, view } = params;
    const urlJsonFile = `${__dirname}\\..\\json\\${dir}.json`;
    const getJsonValueFile = fs.readFileSync(urlJsonFile);
        
    let a;
    let newChannel: string[] = [];
    const timestamp = Math.floor(Date.now());
    let channelsData = JSON.parse(params.key);
    let json = JSON.parse(getJsonValueFile.toString());
    
    channelsData.forEach((element: any) => {
      (Object.keys(element) as (keyof typeof element)[]).forEach((key, indexs) => {
        
        a = [];
        element[key].forEach((element: any) => {
          
          let keyChannel  = json[0].indexOf(key);
          newChannel[0] = element.time;
          newChannel[keyChannel] = element.view;
          a.push(newChannel);
        });
      });
    });
    
    json = json.concat(a);

    console.log(json);
    json = JSON.stringify(json);
    fs.writeFile(urlJsonFile, json, 'utf8', this.JsonErrors);
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