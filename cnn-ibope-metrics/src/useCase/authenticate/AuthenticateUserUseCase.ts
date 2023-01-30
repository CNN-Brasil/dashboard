import { AuthenticateUser } from "../../repositories/AuthenticateUser";

class AuthenticateUserUseCase {
  constructor(private authenticateUser: AuthenticateUser) { }

  async authenticateUserLDAP(email: string, pass: string): Promise<object> {
    const object = await this.authenticateUser.authenticateUserLDAP(email, pass);
    return object;
  }
}

export { AuthenticateUserUseCase }