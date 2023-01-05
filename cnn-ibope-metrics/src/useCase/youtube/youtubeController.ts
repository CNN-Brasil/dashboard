import { Request, Response } from "express";
import { IRunBotParamsDTO } from "../../interfaces/IRunBot";
import { YoutubeUseCase } from "./youtubeUseCase";

class YoutubeController {
  constructor(private youtubeUseCase: YoutubeUseCase) { }

  handle(params: IRunBotParamsDTO) {
    this.youtubeUseCase.RunBot(params);
  }
}

export { YoutubeController };