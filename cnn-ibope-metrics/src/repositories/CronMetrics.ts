import { ICronMetrics } from "../interfaces/ICronMetrics";
import { JsonMetricFS } from "./JsonMetricFS";
import { RunBotPuppeteer } from "./RunBotPuppeteer";
import { RubBotPuppeteerIbope } from "./RunBotPuppeteerIbope";

const cron = require('node-cron');

class CronMetrics implements ICronMetrics {

  private jsonMetric = new JsonMetricFS();


  async CronRunBotIbope(): Promise<void> {
    const ibopeClass = new RubBotPuppeteerIbope();
    const objIbope = await ibopeClass.RunBot({ url: 'https://www.realtimebrasil.com/', key: '' });
    const sringIbope = JSON.stringify(objIbope);

    this.jsonMetric.SaveJson({ json: sringIbope, archive: 'ibope-metric' });
  }

  async CronRunBotYoutube(): Promise<void> {
    const youtubeClass = new RunBotPuppeteer();
    const cnn = await youtubeClass.RunBot({ url: 'https://www.youtube.com/@CNNbrasil', key: 'CNNBRASIL' });
    const jovempannews = await youtubeClass.RunBot({ url: 'https://www.youtube.com/@jovempannews', key: 'JOVEMPANNEWS' });
    const bandjornalismo = await youtubeClass.RunBot({ url: 'https://www.youtube.com/@RadioBandNewsFM', key: 'BANDNEWS' });
    const recordnews = await youtubeClass.RunBot({ url: 'https://www.youtube.com/@recordnews', key: 'RECORDNEWS' });

    const objChannels = [{
      "CNNBRASIL": cnn,
      "JOVEMPANNEWS": jovempannews,
      "BANDNEWS": bandjornalismo,
      "RECORDNEWS": recordnews,
      "GLOBONEWS": {
        "time": new Date().toLocaleTimeString('pt-BR', {
          hour12: false,
          hour: "numeric",
          minute: "numeric"
        }), "view": 0
      }
    }];

    const stringChannels = JSON.stringify(objChannels);
    this.jsonMetric.SaveJson({ json: stringChannels, archive: 'youtube-metric' });
  }

  RunCron(): void {
    cron.schedule('* * * * *', () => {
      console.log('Minute : ' + new Date().toLocaleTimeString('pt-BR', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
      }));
    });
  }
}

export { CronMetrics }