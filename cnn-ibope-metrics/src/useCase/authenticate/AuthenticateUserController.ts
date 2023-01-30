import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) { }

  async handler(req: Request, res: Response): Promise<object> {
    const email = req.body.email;
    const pass = req.body.pass;
    const validated = await this.authenticateUserUseCase.authenticateUserLDAP(email, pass);
    const object = res.status(200).json(validated);
    return object;
  }
}

export { AuthenticateUserController }