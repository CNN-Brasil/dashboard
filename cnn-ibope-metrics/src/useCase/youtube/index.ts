import { RunBotPuppeteer } from "../../repositories/RunBotPuppeteer";
import { YoutubeController } from "./youtubeController";
import { YoutubeUseCase } from "./youtubeUseCase";


export default(): YoutubeController => {

    const RunBot = new RunBotPuppeteer();
    const youtubeUseCase = new YoutubeUseCase(RunBot);
    const youtubeController = new YoutubeController(youtubeUseCase);
    
    return youtubeController;
}