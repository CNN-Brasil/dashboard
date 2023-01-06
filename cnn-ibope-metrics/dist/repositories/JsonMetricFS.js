"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonMetricFS = void 0;
const fs_1 = __importDefault(require("fs"));
class JsonMetricFS {
    SaveJson(params) {
        const { key, title, view } = params;
        const urlJsonFile = `${__dirname}\\..\\json\\youtube-metric.json`;
        const timestamp = Math.floor(Date.now());
        const getJsonValueFile = fs_1.default.readFileSync(urlJsonFile);
        let json = JSON.parse(getJsonValueFile.toString());
        let obj = `{
      "${timestamp}": [{
        "views": "${view}",
        "title": "${title}",
        "timestamp": "${timestamp}"
      }]
    }`;
        obj = JSON.parse(obj);
        json[key].push(obj);
        json = JSON.stringify(json);
        fs_1.default.writeFile(urlJsonFile, json, 'utf8', this.JsonErrors);
    }
    JsonErrors(err) {
        if (err) {
            return 'ERRR';
        }
        return 'Save';
    }
    GetJson() {
        const urlJsonFile = `${__dirname}\\..\\json\\youtube-metric.json`;
        const getJsonValueFile = fs_1.default.readFileSync(urlJsonFile);
        return getJsonValueFile.toString();
    }
}
exports.JsonMetricFS = JsonMetricFS;
