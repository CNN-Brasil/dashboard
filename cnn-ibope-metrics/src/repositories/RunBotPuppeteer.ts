import { IRunBot, IRunBotParamsDTO } from "../interfaces/IRunBot";
import { JsonMetricFS } from "./JsonMetricFS";
import puppeteer from 'puppeteer';

class RunBotPuppeteer implements IRunBot {
  
  async RunBot(params: IRunBotParamsDTO): Promise<any> {
  
    const {url, key}   = params;
    const browser      = await puppeteer.launch();

    const pageInit     = await browser.newPage();
    const selectLive   = '#contents ytd-video-renderer.ytd-channel-featured-content-renderer #thumbnail';
    const resultsViews = '#above-the-fold yt-formatted-string#original-info .style-scope:first-child';
    const resultTitle  = '#above-the-fold #title h1';

    let a = [];

    await pageInit.goto(url);
    await pageInit.content();
    
    if (0 === (await pageInit.$$(selectLive)).length ) {
      await browser.close();
      return false;
    }
    
    /**
     * Click to open live video youtube
    **/
    const newPage = await pageInit.evaluate(selectLive => {
      return [...document.querySelectorAll(selectLive)].map(view => {
        return `${ view }`;
      });
    }, selectLive);
    
    if (0 === newPage.length) {
      console.log(newPage.length);
      await browser.close();
      return false;
    }

    for await (const pageLive of newPage) {
      let index = 0;
      /**
        *  Open page live youtube
      **/
      if (pageLive)		
      await pageInit.goto(pageLive);
      await pageInit.bringToFront();
      await pageInit.content();

      await pageInit.waitForTimeout(5000);

      await pageInit.waitForSelector(resultsViews, {timeout:0});
      await pageInit.waitForSelector(resultTitle, {timeout:0});
      
      /**
        *  get total views youtube live
      **/
      const view = await pageInit.evaluate((resultsViews) => {
        let getViewsElement = document.querySelector(resultsViews);
        const  view = getViewsElement?.textContent?.replace(/\D/g,'') ?? "0";
        return view;
      }, resultsViews, index++);

      /**
        *  get title video youtube live
      **/
      const time = await pageInit.evaluate((resultTitle) => {
        let getViewsElement = document.querySelector(resultTitle);
        const title = getViewsElement?.textContent?.trim() ?? ' - ';
        return title;
      }, resultTitle, index++);

      const hours = new Date();
      const hourss = hours.getHours() +":"+ hours.getMinutes();  
      const JsonMetric = new JsonMetricFS();
      const json = `{
        "${key}": [
          { "time": "${hourss}", "view": "${view}" }
        ]
      }`;
      const finalJson = [JSON.parse(json)];
      JsonMetric.SaveJson({key:JSON.stringify(finalJson), time, view}, 'youtube-metric');
      a.push({ key, view, time });
    }

    await browser.close();
    return a;
  }
}

export { RunBotPuppeteer }