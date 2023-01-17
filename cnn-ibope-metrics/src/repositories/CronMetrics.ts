import { ICronMetrics } from "../interfaces/ICronMetrics";
import { JsonMetricFS } from "./JsonMetricFS";
import { RunBotPuppeteer } from "./RunBotPuppeteer";
import { RubBotPuppeteerIbope } from "./RunBotPuppeteerIbope";
import { FixJsonDate } from "../includes/FixJsonDate";

const youtube = require('node-cron');
const jsonValid = require('node-cron');


class CronMetrics implements ICronMetrics {

  private jsonMetric = new JsonMetricFS();

  async CronRunBotIbope(): Promise<void> {
    let object = {};

    try {
      const ibopeClass = new RubBotPuppeteerIbope();
      const objIbope = await ibopeClass.RunBot({ url: 'https://www.realtimebrasil.com/', key: '' });
    } catch (error) {
      object = { message: "Error Ibope" };
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
        'BANDNEWS': { url: 'https://www.youtube.com/@RadioBandNewsFM' },
        'RECORDNEWS': { url: 'https://www.youtube.com/@recordnews' },
      }
      
      for await (const [key, value] of Object.entries(channels)) {
        const result: any = await youtubeClass.RunBot({ url: value.url, key: key });
        obj[key] = result;
      }
      obj['GLOBONEWS'] = {
        "time": new Date().toLocaleTimeString('pt-BR', {
          hour12: false,
          hour: "numeric",
          minute: "numeric"
        }), "view": 0
      };

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

    jsonValid.schedule('*/2 * * * *', () => {
      console.log('Minute Json Valid: ' + new Date().toLocaleTimeString('pt-BR', {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }));

      const fixJsonDate: any = new FixJsonDate();
      fixJsonDate.fixJsonDate('ibope-metric');
      fixJsonDate.fixJsonDate('youtube-metric');
    });
  }
}

export { CronMetrics }