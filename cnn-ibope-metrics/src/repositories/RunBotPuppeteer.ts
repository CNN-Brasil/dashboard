import { IRunBot, IRunBotParamsDTO } from "../interfaces/IRunBot";
import puppeteer from 'puppeteer';
import { FixJsonDate } from "../includes/FixJsonDate";
class RunBotPuppeteer implements IRunBot {
  async RunBot(params: IRunBotParamsDTO): Promise<any> {

    try {
      const { url, key } = params;
      const browser = await puppeteer.launch({ headless: false});
      const pageInit = await browser.newPage();

      const selectLive = '#contents ytd-video-renderer.ytd-channel-featured-content-renderer #thumbnail';
      const resultsViews = '.view-count.style-scope.ytd-video-view-count-renderer';

      let arrayViews = [];

      await pageInit.goto(url);
      await pageInit.content();

      await pageInit.waitForTimeout(5000);

      if (0 === (await pageInit.$$(selectLive)).length) {
        await browser.close();
        return {
          "time": new Date().toLocaleTimeString('pt-BR', {
            hour12: false,
            hour: "numeric",
            minute: "numeric"
          }), "view": 0
        };
      }

      /**
       * Click to open live video youtube
      **/
      const newPage = await pageInit.evaluate(selectLive => {
        return [...document.querySelectorAll(selectLive)].map(view => {
          return `${view}`;
        });
      }, selectLive);

      if (0 === newPage.length) {
        await browser.close();
        return {
          "time": new Date().toLocaleTimeString('pt-BR', {
            hour12: false,
            hour: "numeric",
            minute: "numeric"
          }), "view": 0
        };
      }


      for await (const pageLive of newPage) {
        let index = 0;
        /**
          *  Open page live youtube
        **/
        if (pageLive) {

          await pageInit.goto(pageLive);
          await pageInit.bringToFront();
          await pageInit.waitForTimeout(7000);
          await pageInit.waitForSelector(resultsViews, { timeout: 0 });

          /**
            *  get total views youtube live
          **/
          const view = await pageInit.evaluate((resultsViews) => {
            let getViewsElement = document.querySelector(resultsViews);
            const view = getViewsElement?.textContent?.replace(/\D/g, '') ?? "0";

            return view;
          }, resultsViews, index++);

          arrayViews.push(view);
        }
      }

      const view = arrayViews.reduce((soma, i) => {
        let somaTotal = parseInt(soma) + parseInt(i);
        return somaTotal.toString();
      });

      const json = JSON.parse(`{ "time": "${new Date().toLocaleTimeString('pt-BR', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
      })}", "view": ${parseInt(view)} }`)
      await browser.close();

      return json;
    } catch (error) {
      const fixJsonDate = new FixJsonDate();
      fixJsonDate.fixJsonDate('youtube-metric');
    }
  }
}

export { RunBotPuppeteer }