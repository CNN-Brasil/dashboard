import { IRunBotParamsDTO } from "../../interfaces/IRunBot";
import { RubBotPuppeteerIbope } from "../../repositories/RunBotPuppeteerIbope";

class IbopeUseCase {
    constructor(private runBot: RubBotPuppeteerIbope) {}

    RunBot(params: IRunBotParamsDTO) {
        this.runBot.RunBot(params);
    }
}

export { IbopeUseCase }; 