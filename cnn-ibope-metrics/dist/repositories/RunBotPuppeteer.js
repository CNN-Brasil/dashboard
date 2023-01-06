"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunBotPuppeteer = void 0;
const JsonMetricFS_1 = require("./JsonMetricFS");
const puppeteer_1 = __importDefault(require("puppeteer"));
class RunBotPuppeteer {
    RunBot(params) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { url, key } = params;
            const browser = yield puppeteer_1.default.launch();
            console.log(key);
            const pageInit = yield browser.newPage();
            const selectLive = '#contents ytd-video-renderer.ytd-channel-featured-content-renderer #thumbnail';
            const resultsViews = '#above-the-fold yt-formatted-string#original-info .style-scope:first-child';
            const resultTitle = '#above-the-fold #title h1';
            let a = [];
            yield pageInit.goto(url);
            yield pageInit.content();
            if (0 === (yield pageInit.$$(selectLive)).length) {
                yield browser.close();
                return false;
            }
            /**
             * Click to open live video youtube
            **/
            const newPage = yield pageInit.evaluate(selectLive => {
                return [...document.querySelectorAll(selectLive)].map(view => {
                    return `${view}`;
                });
            }, selectLive);
            if (0 === newPage.length) {
                console.log(newPage.length);
                yield browser.close();
                return false;
            }
            try {
                for (var _d = true, newPage_1 = __asyncValues(newPage), newPage_1_1; newPage_1_1 = yield newPage_1.next(), _a = newPage_1_1.done, !_a;) {
                    _c = newPage_1_1.value;
                    _d = false;
                    try {
                        const pageLive = _c;
                        let index = 0;
                        /**
                          *  Open page live youtube
                        **/
                        if (pageLive)
                            yield pageInit.goto(pageLive);
                        yield pageInit.bringToFront();
                        yield pageInit.content();
                        yield pageInit.waitForTimeout(5000);
                        yield pageInit.waitForSelector(resultsViews);
                        yield pageInit.waitForSelector(resultTitle);
                        /**
                          *  get total views youtube live
                        **/
                        const view = yield pageInit.evaluate((resultsViews) => {
                            var _a, _b;
                            let getViewsElement = document.querySelector(resultsViews);
                            const view = (_b = (_a = getViewsElement === null || getViewsElement === void 0 ? void 0 : getViewsElement.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\D/g, '')) !== null && _b !== void 0 ? _b : "0";
                            return view;
                        }, resultsViews, index++);
                        /**
                          *  get title video youtube live
                        **/
                        const title = yield pageInit.evaluate((resultTitle) => {
                            var _a, _b;
                            let getViewsElement = document.querySelector(resultTitle);
                            const title = (_b = (_a = getViewsElement === null || getViewsElement === void 0 ? void 0 : getViewsElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : ' - ';
                            return title;
                        }, resultTitle, index++);
                        const JsonMetric = new JsonMetricFS_1.JsonMetricFS();
                        JsonMetric.SaveJson({ key, title, view });
                        a.push({ key, view, title });
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = newPage_1.return)) yield _b.call(newPage_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            yield browser.close();
            return a;
        });
    }
}
exports.RunBotPuppeteer = RunBotPuppeteer;
