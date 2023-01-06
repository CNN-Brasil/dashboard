import puppeteer from 'puppeteer';
import { IRunBot, IRunBotParamsDTO } from '../interfaces/IRunBot';
import { ConverterDataChannel } from '../useCase/ibope/ConverterDataChannel';

class RubBotPuppeteerIbope implements IRunBot {
  async RunBot(params: IRunBotParamsDTO): Promise<object> {

    const { url } = params;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url, { waitUntil: 'load',timeout: 0 });
    await page.waitForSelector("[for='TOSCheckBox']");
    await page.waitForSelector("[for='saveInfoCheckbox']");
    await page.waitForSelector("[type='submit']");

    const saveCheckbox = await page.$$("[for='saveInfoCheckbox']");
    const TOS = await page.$$("[for='TOSCheckBox']");
    const submit = await page.$$("[type='submit']");

    await page.type("[name='username']", "pedro.sposito@cnnbrasil.com.br");
    await page.type("[name='password']", "fsfbI0rHLv1%");
    await saveCheckbox[0].click();
    await TOS[0].click();
    await page.waitForTimeout(9000);
    await submit[0].click();

    const getValues = ".dataTable.desktop > div:last-child";

    await page.waitForSelector(getValues);
    await page.waitForTimeout(9000);

    const data = await page.evaluate(getValues => {

      return [...document.querySelectorAll(getValues)].map(anchor => {

        let title = anchor.querySelectorAll('.tableHeader td div');
        let data = anchor.querySelectorAll('.tableRow.type1');
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

          let channelArray = [];
          let payTVArray = [];

          //for (let index = 0; index < data.length; index++) {
          //const element = data[index];

          let share = data[0].querySelectorAll('td')[indexs].querySelectorAll('span')[1]?.textContent?.replace('%', '') ?? '';
          let hours = time[0].querySelector('td span')?.textContent;

          if ("TOTALPAYTV" === nameChannel) {
            const payTV = ` { "payTV": "${share}" } `;
            payTVArray.push(payTV);
          }

          if ("TOTALPAYTV" !== nameChannel) {
            const channelObjData = ` {"share": "${share}", "time": "${hours}"} `;
            channelArray.push(channelObjData);
          }
          //}

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
        return JSON.stringify(objtableArr);
      });
    }, getValues);

    await browser.close();

    return this.MountJson(data);
  }

  MountJson(data: any): string[] {
    let ibopeFinal: string[] = [];
    let ibopeArr: string[] = [];

    data.forEach((data: any) => {
      const obj = JSON.parse(data);
      obj.CHANNEL.forEach((channel: [key: any]) => {
        (Object.keys(channel) as (keyof typeof channel)[]).forEach((keyChannel, indexs) => {

          for (let index = 0; index < channel[keyChannel].length; index++) {
            const element = channel[keyChannel][index];

            ibopeArr = [];
            obj.PAYTV.forEach((channnelShare: any) => {
              (Object.keys(channnelShare) as (keyof typeof channnelShare)[]).forEach((key, indexs) => {
                const sharePayTV = channnelShare[key].payTV;
                const shareChannel = element.share?.replace('-', '0');
                const converterDataChannel = new ConverterDataChannel();
                const views = converterDataChannel.CalculationChannel(sharePayTV, shareChannel);
                ibopeArr.push(`{"time": "${element.time.toString()}", "view": ${parseInt(views.toString())} }`);
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