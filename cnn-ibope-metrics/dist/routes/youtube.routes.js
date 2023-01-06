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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetYoutubeJson = void 0;
const RunBotPuppeteer_1 = require("../repositories/RunBotPuppeteer");
const JsonMetricFS_1 = require("../repositories/JsonMetricFS");
function GetYoutubeJson(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const pro = new RunBotPuppeteer_1.RunBotPuppeteer();
        yield pro.RunBot({ url: "https://www.youtube.com/@CNNbrasil", key: 'CNN' });
        yield pro.RunBot({ url: 'https://www.youtube.com/@jovempannews', key: 'JOVEMPANNEWS' });
        yield pro.RunBot({ url: 'https://www.youtube.com/@RadioBandNewsFM', key: 'BANDJORNALISMO' });
        yield pro.RunBot({ url: 'https://www.youtube.com/@recordnews', key: 'RECORDNEWS' });
        yield pro.RunBot({ url: 'https://www.youtube.com/@CazeTV', key: 'CAZETV' });
        const getJson = new JsonMetricFS_1.JsonMetricFS();
        const json = getJson.GetJson();
        response.send(json);
    });
}
exports.GetYoutubeJson = GetYoutubeJson;
