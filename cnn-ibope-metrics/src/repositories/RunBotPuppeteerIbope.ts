import puppeteer from 'puppeteer';
import { IRunBot, IRunBotParamsDTO } from '../interfaces/IRunBot';
import { ConverterDataChannel } from '../useCase/ibope/ConverterDataChannel';
import { JsonMetricFS } from './JsonMetricFS';
const ibope = require('node-cron');

class RubBotPuppeteerIbope implements IRunBot {

  private jsonMetric = new JsonMetricFS();

  async RunBot(params: IRunBotParamsDTO): Promise<void> {

    const url: any = params.url;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    browser.on('disconnected', async () => {
      console.log('aqui');
      task.stop();
      await this.RunBot({ url: 'https://www.realtimebrasil.com/', key: '' });
    });

    try {
      await page.waitForSelector("[for='TOSCheckBox']");
      await page.waitForSelector("[for='saveInfoCheckbox']");
      await page.waitForSelector("[type='submit']");

      const saveCheckbox = await page.$$("[for='saveInfoCheckbox']");
      const TOS = await page.$$("[for='TOSCheckBox']");
      const submit = await page.$$("[type='submit']");

      await page.type("[name='username']", "pedro.sposito@cnnbrasil.com.br");
      await page.waitForTimeout(1000);
      await page.type("[name='password']", "fsfbI0rHLv1%");

      await page.waitForTimeout(1000);
      await saveCheckbox[0].click();
      await page.waitForTimeout(1000);
      await TOS[0].click();
      await page.waitForTimeout(1000);
      await submit[0].click();
      await page.waitForTimeout(1000);
      
      try {
        var task = ibope.schedule('* * * * *', async () => {

          console.log('Minute Ibope: ' + new Date().toLocaleTimeString('pt-BR', {
            hour12: false,
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          }));

          const getValues = ".dataTable.desktop > div:last-child";
          await page.waitForTimeout(40000);
          
          const data = await page.evaluate(getValues => {

            return [...document.querySelectorAll(getValues)].map((anchor) => {
              let title = anchor.querySelectorAll('.tableHeader td div');
              let data = anchor.querySelectorAll('.tableRow.type1');
              let data2 = anchor.querySelector('.tableRow.type2');
              let time = document.querySelectorAll('#row-headers tr');
              let channelObjArr = [];
              let payTVObjArr = [];

              for (let indexs = 0; indexs < title.length; indexs++) {

                const element = title[indexs];
                let nameChannel = element.querySelector('span')?.textContent;

                if (!nameChannel) {
                  nameChannel = element.querySelector('img')?.title;
                }

                nameChannel = nameChannel?.toString().split(' ').join('') ?? '';

                let payTVArray = [];
                let arrayShare = [];
                let arrayTime = [];

                for (let index = 0; index < data.length; index++) {
                  const element = data[index];
                  let share = element.querySelectorAll('td')[indexs].querySelectorAll('span')[0]?.textContent ?? '';
                  let hours = time[index].querySelector('td span')?.textContent;

                  if ("TOTALPAYTV" === nameChannel) {
                    const payTV = ` ${share} `;
                    payTVArray.push(payTV);
                  }

                  if ("TOTALPAYTV" !== nameChannel) {
                    const channelObjs = ` "${share}" `;
                    arrayShare.push(channelObjs);

                    const timeObjs = ` "${hours}" `;
                    arrayTime.push(timeObjs);
                  }
                }
                
                if (data2) {
                  let ShareConsolidated = data2.querySelectorAll('td')[indexs].querySelectorAll('span')[0]?.textContent ?? '';
                  let hoursConsolidated = time[data.length].querySelector('td span')?.textContent;
  
                  const channelObjs = ` "${ShareConsolidated}" `;
                  arrayShare.push(channelObjs);
                    
                  const timeObjs = ` "${hoursConsolidated}" `;
                  arrayTime.push(timeObjs);

                  if ("TOTALPAYTV" === nameChannel) {
                    const payTV = ` ${ShareConsolidated} `;
                    payTVArray.push(payTV);
                  }
                }

                if ("TOTALPAYTV" !== nameChannel) {
                  let channelObjData = ` { "${nameChannel}": { "share": [ ${arrayShare} ], "time": [ ${arrayTime} ] } } `;
                  const channelObjs = JSON.parse(channelObjData);
                  channelObjArr.push(channelObjs);
                }

                if ("TOTALPAYTV" === nameChannel) {
                  let payTVObj = ` { "payTV": [ ${payTVArray} ] } `;
                  const payTVObjs = JSON.parse(payTVObj);
                  payTVObjArr.push(payTVObjs);
                }
              }

              const objtableArr = { "CHANNEL": channelObjArr, "PAYTV": payTVObjArr };
              return objtableArr;
            });
          }, getValues);

          if (0 === data.length) {
            console.error('data empty');
            browser.close();
            return;
          }
          
          this.jsonMetric.SaveJsonIbope({ json: JSON.stringify(this.MountJson(data)), archive: 'ibope-metric' });
        });

      } catch (error) {
        console.error('error');
        task.stop();
        browser.close();
      }

    } catch (error) {
      console.error('error');
      task.stop();
      browser.close();
    }
  }

  MountJson(data: object[]): object {
    try {
      let ibopeFinal: string[] = [];
      let channelArr: string[] = [];
      const converterDataChannel = new ConverterDataChannel();

      data.forEach((data: any) => {
        data.CHANNEL.forEach((channels: [key: any]) => {
          (Object.keys(channels) as (keyof typeof channels)[]).forEach((keyChannel: any, indexs) => {
            const channel = channels[keyChannel];
            let arrayShare: string[] = [];
            let timeShare: string[] = [];

            channel.share.forEach((share: any) => {
              arrayShare.push(share.replace('-', 0));
            });

            channel.time.forEach((time: string) => {
              const timeString = ` "${time}"`;
              timeShare.push(timeString);
            });

            const channelsString = `{ "${keyChannel}": { "share" : [${arrayShare}], "time": [${timeShare}] }  }`;
            channelArr.push(JSON.parse(channelsString));
          });
        });

        data.PAYTV.forEach((channnelShare: any) => {
          channelArr.forEach((element: any) => {
            let arrViews: string[] = [];
            let arrTime: string[] = [];
            (Object.keys(element) as (keyof typeof element)[]).forEach((keyChannel: any, d) => {
              channnelShare.payTV.forEach((sharePayTV: string, indexs: number) => {
                const views: any = converterDataChannel.Calculation(element[keyChannel].share[indexs], keyChannel);
                arrViews.push(views);
                arrTime.push(`"${element[keyChannel].time[indexs]}"`);
              });
              ibopeFinal.push(JSON.parse(`{ "${keyChannel}": { "share" : [${arrViews}], "time": [${arrTime}] }  }`));
            });
          });
        });
      });

      return ibopeFinal;
    } catch (error) {
      console.error('error');
      this.RunBot({ url: 'https://www.realtimebrasil.com/', key: '' });
      return { message: error }
    }
  }

}

export { RubBotPuppeteerIbope };