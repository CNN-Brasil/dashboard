import { Response } from "express";
import { ShareConsolidatedUseCase } from "./ShareConsolidatedUseCase";


class ShareConsolidatedController {
    constructor(private shareConsolidatedUseCase: ShareConsolidatedUseCase){}
    
    handler(archive:String[], response: Response):object {
         let object: object
        try {
            object = this.shareConsolidatedUseCase.GetShareJson(archive);
            return response.status(201).json(object);
        } catch (error) {
            object = { message: 'Error in object' };
            return response.status(401).json(object);;
        }
    }
}

export { ShareConsolidatedController }