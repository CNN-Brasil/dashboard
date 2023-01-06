"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const youtube_routes_1 = require("./routes/youtube.routes");
const app = (0, express_1.default)();
app.get('/youtube', youtube_routes_1.GetYoutubeJson);
const port = 9999;
app.listen(port);
// import { RunBotPuppeteer } from './repositories/RunBotPuppeteer';
// const pro = new RunBotPuppeteer();
// async function f() {
//   await pro.RunBot({ url: "https://www.youtube.com/@CNNbrasil", key: 'CNN' });
//   await pro.RunBot({ url: 'https://www.youtube.com/@jovempannews', key: 'JOVEMPANNEWS' });
//   await pro.RunBot({ url: 'https://www.youtube.com/@RadioBandNewsFM', key: 'BANDJORNALISMO' });
//   await pro.RunBot({ url: 'https://www.youtube.com/@recordnews', key: 'RECORDNEWS' });
// }
// f();
