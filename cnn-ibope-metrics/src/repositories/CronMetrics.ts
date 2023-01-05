import { ICronMetrics } from "../interfaces/ICronMetrics";
import { RunBotPuppeteer } from "./RunBotPuppeteer";
import { RubBotPuppeteerIbope } from "./RunBotPuppeteerIbope";

const cron = require('node-cron');

class CronMetrics implements ICronMetrics {

  async CronRunBot(): Promise<void> {
    const pro = new RunBotPuppeteer();
    const ibope = new RubBotPuppeteerIbope();
    await pro.RunBot({ url: 'https://www.youtube.com/@CNNbrasil', key: 'CNN' });
    await pro.RunBot({ url: 'https://www.youtube.com/@jovempannews', key: 'JOVEMPANNEWS' });
    await pro.RunBot({ url: 'https://www.youtube.com/@RadioBandNewsFM', key: 'BANDJORNALISMO' });
    await pro.RunBot({ url: 'https://www.youtube.com/@recordnews', key: 'RECORDNEWS' });
    await ibope.RunBot({ url: 'https://www.realtimebrasil.com/', key: '' });
  }

  RunCron(): void {
    cron.schedule('* * * * *', () => {
      const d = new Date();
      let hour = d.getMinutes();

      console.log('Minute : ' + hour);
      this.CronRunBot();
    }
    );
  }
}

export { CronMetrics }