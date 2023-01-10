import puppeteer from 'puppeteer';
import { IRunBot, IRunBotParamsDTO } from '../interfaces/IRunBot';
import { ConverterDataChannel } from '../useCase/ibope/ConverterDataChannel';
import { JsonMetricFS } from './JsonMetricFS';
class RubBotPuppeteerIbope implements IRunBot {

  private jsonMetric = new JsonMetricFS();

  async RunBot(params: IRunBotParamsDTO): Promise<void> {
    const url: any = params.url;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    await page.waitForSelector("[for='TOSCheckBox']", { timeout: 0 });
    await page.waitForSelector("[for='saveInfoCheckbox']", { timeout: 0 });
    await page.waitForSelector("[type='submit']", { timeout: 0 });

    const saveCheckbox = await page.$$("[for='saveInfoCheckbox']");
    const TOS = await page.$$("[for='TOSCheckBox']");
    const submit = await page.$$("[type='submit']");

    await page.type("[name='username']", "pedro.sposito@cnnbrasil.com.br");
    await page.waitForTimeout(2500);
    await page.type("[name='password']", "fsfbI0rHLv1%");
    await page.waitForTimeout(2500);
    await saveCheckbox[0].click();
    await page.waitForTimeout(2500);
    await TOS[0].click();
    await page.waitForTimeout(2500);
    await submit[0].click();
    await page.waitForTimeout(2500);

    const refreshIntervalId = setInterval(async () => {
      try {

        const getValues = ".dataTable.desktop > div:last-child";
        await page.waitForSelector(getValues, { timeout: 0 });
        await page.waitForTimeout(2500);

        const data: object[] = await page.evaluate(getValues => {

          return [...document.querySelectorAll(getValues)].map(anchor => {

            let title = anchor.querySelectorAll('.tableHeader td div');
            let data = anchor.querySelectorAll('.tableRow.type1');
            let channelObjArr = [];
            let payTVObjArr = [];

            for (let indexs = 0; indexs < title.length; indexs++) {

              const element = title[indexs];
              let nameChannel = element.querySelector('span')?.textContent;

              if (!nameChannel) {
                nameChannel = element.querySelector('img')?.title;
              }

              nameChannel = nameChannel?.toString().split(' ').join('') ?? '';

              let channelArray = [];
              let payTVArray = [];

              let share = data[0].querySelectorAll('td')[indexs].querySelectorAll('span')[1]?.textContent?.replace('%', '') ?? '';

              if ("TOTALPAYTV" === nameChannel) {
                const payTV = ` { "payTV": "${share}" } `;
                payTVArray.push(payTV);
              }

              if ("TOTALPAYTV" !== nameChannel) {
                const channelObjData = ` { "share": "${share}" } `;
                channelArray.push(channelObjData);
              }

              if ("TOTALPAYTV" !== nameChannel) {
                let channelObj = `{ "${nameChannel}": [${channelArray}] }`;
                const channelObjs = JSON.parse(channelObj);
                channelObjArr.push(channelObjs);
              }

              if ("TOTALPAYTV" === nameChannel) {
                let payTVObj = ` [${payTVArray}] `;
                const payTVObjs = JSON.parse(payTVObj);
                payTVObjArr.push(payTVObjs);
              }
            }
            const objtableArr = { "CHANNEL": channelObjArr, "PAYTV": payTVObjArr };
            return objtableArr;
          });
        }, getValues);

        this.jsonMetric.SaveJson({ json: JSON.stringify(this.MountJson(data)), archive: 'ibope-metric' });
      } catch (error) {
        console.error('ERR');
        clearInterval(refreshIntervalId);
        browser.close();
        this.RunBot({ url: 'https://www.realtimebrasil.com/', key: '' });
      }
    }, 60000);

  }

  MountJson(data: object[]): object {
    let ibopeFinal: string[] = [];
    let ibopeArr: string[] = [];

    data.forEach((data: any) => {
      data.CHANNEL.forEach((channel: [key: any]) => {
        (Object.keys(channel) as (keyof typeof channel)[]).forEach((keyChannel, indexs) => {
          for (let index = 0; index < channel[keyChannel].length; index++) {
            const element = channel[keyChannel][index];

            ibopeArr.length = 0;

            data.PAYTV.forEach((channnelShare: any) => {
              (Object.keys(channnelShare) as (keyof typeof channnelShare)[]).forEach((key, indexs) => {
                const sharePayTV = channnelShare[key].payTV;
                const shareChannel = element.share?.replace('-', '0');
                const converterDataChannel = new ConverterDataChannel();
                const views = converterDataChannel.CalculationChannel(sharePayTV, shareChannel);
                ibopeArr.push(`{"time": "${new Date().toLocaleTimeString('pt-BR', {
                  hour12: false,
                  hour: "numeric",
                  minute: "numeric"
                })}", "view": ${parseInt(views.toString())} }`);
              });
            });
          }

          const finalString = `{"${keyChannel.toString()}": ${ibopeArr}}`;
          const finalJson = JSON.parse(finalString);
          ibopeFinal.push(finalJson);
        });
      });
    });

    return ibopeFinal;
  }
}

export { RubBotPuppeteerIbope };