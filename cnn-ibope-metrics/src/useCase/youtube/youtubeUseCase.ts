import { IRunBotParamsDTO } from "../../interfaces/IRunBot";
import { RunBotPuppeteer } from "../../repositories/RunBotPuppeteer";


class YoutubeUseCase {
    constructor(private repository: RunBotPuppeteer) {}

    RunBot(params: IRunBotParamsDTO): Boolean {
        this.repository.RunBot(params);
        return true;
    }
}

export { YoutubeUseCase }