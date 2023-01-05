import { Request, Response } from "express";
import { IRunBotParamsDTO } from "../../interfaces/IRunBot";
import { IbopeUseCase } from "./IbopeUseCase";

class IbopeController {
    constructor(private ibopeUseCase:IbopeUseCase) {}
    handler(params: IRunBotParamsDTO) {
        this.ibopeUseCase.RunBot(params);
    }
}

export { IbopeController }