import { AuthenticateUser } from "../../repositories/AuthenticateUser";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const authenticateUser           = new AuthenticateUser();
const authenticateUserUseCase    = new AuthenticateUserUseCase(authenticateUser);
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

export { authenticateUserController };