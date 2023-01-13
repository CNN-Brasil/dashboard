import { IRunBot, IRunBotParamsDTO } from "../interfaces/IRunBot";
import puppeteer from 'puppeteer';

var startTime = performance.now();
class RunBotPuppeteer implements IRunBot {


  async RunBot(params: IRunBotParamsDTO): Promise<object> {

    console.log(`Call to doSomething took START ${startTime} milliseconds`)
    const { url, key } = params;
    const browser = await puppeteer.launch({ executablePath: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe` });
    const pageInit = await browser.newPage();

    const selectLive = '#contents ytd-video-renderer.ytd-channel-featured-content-renderer #thumbnail';
    const resultsViews = '.view-count.style-scope.ytd-video-view-count-renderer';

    let arrayViews = [];

    await pageInit.goto(url);
    await pageInit.content();
    console.log("PASSO 2")

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

        console.log("PASSO 3")
        await pageInit.goto(pageLive);

        console.log("PASSO 3.1")
        await pageInit.bringToFront();

        console.log("PASSO 3.2")
        let endTime = performance.now();

        console.log(`Call to doSomething took END ${endTime} milliseconds`);

        await pageInit.waitForSelector(resultsViews, { timeout: 0 });
        
        console.log("PASSO 3.3");

        /**
          *  get total views youtube live
        **/
        const view = await pageInit.evaluate((resultsViews) => {
          let getViewsElement = document.querySelector(resultsViews);
          const view = getViewsElement?.textContent?.replace(/\D/g, '') ?? "0";

          return view;
        }, resultsViews, index++);

        arrayViews.push(view);
      } else {
        console.log(`Call to doSomething took ${startTime} milliseconds`)
        console.log(pageLive);
        console.log("PASSO 3.1 NOT PAGE")
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
    console.log("PASSO 4")
    console.log(json);
    return json;
  }
}

export { RunBotPuppeteer }