import { IRunBot, IRunBotParamsDTO } from "../interfaces/IRunBot";
import puppeteer from 'puppeteer';

class RunBotPuppeteer implements IRunBot {
  
  async RunBot(params: IRunBotParamsDTO): Promise<object> {
  
    const {url, key}   = params;
    const browser      = await puppeteer.launch();
    const pageInit     = await browser.newPage();

    const selectLive   = '#contents ytd-video-renderer.ytd-channel-featured-content-renderer #thumbnail';
    const resultsViews = '#above-the-fold yt-formatted-string#original-info .style-scope:first-child';
    const resultTitle  = '#above-the-fold #title h1';
 
    let arrayViews = [];
    
    await pageInit.goto(url, { waitUntil: 'load',timeout: 0 });
    await pageInit.content();
    
    if (0 === (await pageInit.$$(selectLive)).length ) {
      await browser.close();
      return { "time": new Date().toLocaleTimeString('pt-BR', { hour12: false, 
        hour: "numeric", 
        minute: "numeric"}), "view": 0 };
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
      await browser.close();
      return { "time": new Date().toLocaleTimeString('pt-BR', { hour12: false, 
        hour: "numeric", 
        minute: "numeric"}), "view": 0 };
    }

    for await (const pageLive of newPage) {
      
      let index = 0;
      /**
        *  Open page live youtube
      **/
      if (pageLive)	

      await pageInit.goto(pageLive, { waitUntil: 'load',timeout: 0 });
      await pageInit.bringToFront();
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
      
      arrayViews.push(parseInt(view));
    }

    const view = arrayViews.reduce(function(soma, i) {
      return soma + i;
    });

    const json = JSON.parse(`{ "time": "${new Date().toLocaleTimeString('pt-BR', { hour12: false, 
      hour: "numeric", 
      minute: "numeric"})}", "view": ${parseInt(view.toString())} }`)

    await browser.close();
    return json;
  }
}

export { RunBotPuppeteer }