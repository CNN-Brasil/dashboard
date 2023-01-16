import fs from 'fs';
import { JsonMetricFS } from '../repositories/JsonMetricFS';

class FixJsonDate {

  fixJsonDate(archive: string) {

    const metric = new JsonMetricFS();
    const urlJsonFile = `${__dirname}\\..\\json\\${archive}.json`;
    const getJsonValueFile = fs.readFileSync(urlJsonFile);
    let getJson = JSON.parse(getJsonValueFile.toString());

    if (362 < getJson.length) {
      getJson.splice(1, 1);
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const j: any = getJson.splice(1);
    let count = 0;
    let controllerWhile = true;

    while (controllerWhile) {
      const el = j[count];
      const currentDate = new Date(+yyyy, +mm, +dd, j[0][0].split(':')[0], j[0][0].split(':')[1]);

      const timeRecorrent = currentDate.getTime() + count * 60000; // timestamp
      const Dtoday = new Date(timeRecorrent);
      const time = ('0' + Dtoday.getHours()).substr(-2) + ':' + ('0' + Dtoday.getMinutes()).substr(-2);

      const lastTime = new Date(+yyyy, +mm, +dd, j[j.length - 1][0].split(':')[0], j[j.length - 1][0].split(':')[1]).getTime();
      const timeEnd = new Date(+yyyy, +mm, +dd, el[0].split(':')[0], el[0].split(':')[1]).getTime();

      if (el[0] !== time) {
        j.splice(count, 0, [time, j[count - 1][1], j[count - 1][2], j[count - 1][3], j[count - 1][4], j[count - 1][5]]);
      }


      if (timeEnd === lastTime) {
        controllerWhile = false;
      }

      count++;
    }

    j.unshift(["Horário", "CNNBRASIL", "GLOBONEWS", "RECORDNEWS", "JOVEMPANNEWS", "BANDNEWS"]);
    const stringJson = JSON.stringify(j);
    fs.writeFile(urlJsonFile, stringJson, 'utf8', metric.JsonErrors);
    return j;
  }
}

export { FixJsonDate };