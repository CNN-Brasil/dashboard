import { ICronMetrics } from "../interfaces/ICronMetrics";
import { JsonMetricFS } from "./JsonMetricFS";
import { RunBotPuppeteer } from "./RunBotPuppeteer";
import { RubBotPuppeteerIbope } from "./RunBotPuppeteerIbope";

const ibope = require('node-cron');
const youtube = require('node-cron');

class CronMetrics implements ICronMetrics {

  private jsonMetric = new JsonMetricFS();

  async CronRunBotIbope(): Promise<object> {
    let object = {};

    try {
      const ibopeClass = new RubBotPuppeteerIbope();
      const objIbope = await ibopeClass.RunBot({ url: 'https://www.realtimebrasil.com/', key: '' });
      let sringIbope:any = [new Date().toLocaleTimeString('pt-BR', {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
      }), 0, 0, 0, 0, 0];

      if (0 !== Object.keys(Object.assign([], objIbope)).length) {
        sringIbope = JSON.stringify(objIbope);
      }
      console.log(sringIbope)
      
      this.jsonMetric.SaveJson({ json: sringIbope, archive: 'ibope-metric' });
      
      return JSON.parse(sringIbope);
    } catch (error) {
      return object = { message: "Error Ibope" };
    }
  }

  async CronRunBotYoutube(): Promise<object> {

    let object = {};

    try {
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
            minute: "numeric",
          }), "view": 0
        }
      }];

      const stringChannels = JSON.stringify(objChannels);
      this.jsonMetric.SaveJson({ json: stringChannels, archive: 'youtube-metric' });
      return JSON.parse(stringChannels);
    } catch (error) {
      return object = { message: "Error Ibope" };
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

      try {
        this.CronRunBotYoutube();
      } catch (error) {
        return error;
      }
    });

    this.CronRunBotIbope();
    // ibope.schedule('* * * * *', () => {
     
    //   console.log('Minute Ibope : ' + new Date().toLocaleTimeString('pt-BR', {
    //     hour12: false,
    //     hour: "numeric",
    //     minute: "numeric",
    //     second: "numeric"
    //   }));

    //   try {
    //     this.CronRunBotIbope();
    //   } catch (error) {
    //     return error;
    //   }
    // });

  }
}

export { CronMetrics }