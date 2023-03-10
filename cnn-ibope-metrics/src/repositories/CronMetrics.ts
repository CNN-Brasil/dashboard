import { ICronMetrics } from "../interfaces/ICronMetrics";
import { JsonMetricFS } from "./JsonMetricFS";
import { RunBotPuppeteer } from "./RunBotPuppeteer";
import { RubBotPuppeteerIbope } from "./RunBotPuppeteerIbope";

const youtube = require('node-cron');

class CronMetrics implements ICronMetrics {

  private jsonMetric = new JsonMetricFS();

  async CronRunBotIbope(): Promise<void> {
    let object = {};

    try {
      const ibopeClass = new RubBotPuppeteerIbope();
      await ibopeClass.RunBot({ url: 'https://www.realtimebrasil.com/', key: '' });
    } catch (error) {
      object = { message: error };
      console.log(object);
    }
  }

  async CronRunBotYoutube(): Promise<object> {

    let object = {};

    try {
      const youtubeClass = new RunBotPuppeteer();
      let obj: any = {};

      const channels =
      {
        'CNNBRASIL': { url: 'https://www.youtube.com/@CNNbrasil' },
        'JOVEMPANNEWS': { url: 'https://www.youtube.com/@jovempannews' },
        'OSPINGOSNOSIS': { url: 'https://www.youtube.com/@ospingosnosis' },
      }

      for await (const [key, value] of Object.entries(channels)) {
        let result: any = await youtubeClass.RunBot({ url: value.url, key: key });

        if ('OSPINGOSNOSIS' === key) {
          obj['JOVEMPANNEWS'].view = result.view + obj['JOVEMPANNEWS'].view;
        }

        obj[key] = result;
        delete obj.JOVEMPANNEWSPNI;
      }
      
      const stringChannels = JSON.stringify([obj]);
      this.jsonMetric.SaveJsonYoutube({ json: stringChannels, archive: 'youtube-metric' });

      return JSON.parse(stringChannels);
    } catch (error) {
      return object = { message: error };
    }
  }

  RunCron(): void {
    youtube.schedule('* * * * *', () => {
      console.log('Minute Youtube: ' + new Date().toLocaleTimeString('pt-BR', {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }));

      this.CronRunBotYoutube();
    });

    this.CronRunBotIbope();
  }
}

export { CronMetrics }