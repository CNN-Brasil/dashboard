import { RunBotPuppeteer } from "../../repositories/RunBotPuppeteer";
import { YoutubeController } from "./youtubeController";
import { YoutubeUseCase } from "./youtubeUseCase";

const RunBot = new RunBotPuppeteer();
const youtubeUseCase = new YoutubeUseCase(RunBot);
const youtubeController = new YoutubeController(youtubeUseCase);

export { youtubeController };