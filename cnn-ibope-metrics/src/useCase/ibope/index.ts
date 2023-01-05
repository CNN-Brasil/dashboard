import { RubBotPuppeteerIbope } from "../../repositories/RunBotPuppeteerIbope";
import { IbopeController } from "./IbopeController";
import { IbopeUseCase } from "./IbopeUseCase";


const ibope = new RubBotPuppeteerIbope();
const ibopeUseCase =  new IbopeUseCase(ibope);
const ibopeController = new IbopeController(ibopeUseCase); 

export { ibopeController }