import fs from 'fs';
import { JsonMetricFS } from '../repositories/JsonMetricFS';
/** 
 * Case the puppeteer return null, add last data saved
 * Project: API for loaded the data of audience
 * Definitions by: Sergio Sposito
 */

class FixJsonDate {

  async fixJsonDate(archive: string) {
    const metric = new JsonMetricFS();
    const urlJsonFile = `${__dirname}/../json/${archive}.json`;
    const getJsonValueFile = fs.readFileSync(urlJsonFile);
    let getJson = JSON.parse(getJsonValueFile.toString());

    const time = new Date().toLocaleTimeString('pt-BR', {
      hour12: false,
      hour: "numeric",
      minute: "numeric"
    });

    let i = getJson.length - 1;
    let b = [...getJson[i]];
    b[0] = time;
    getJson.push(b);
    
    const stringJson = JSON.stringify(getJson);
    fs.writeFile(urlJsonFile, stringJson, 'utf8', metric.JsonErrors);
    return stringJson;
  }
}

export { FixJsonDate };