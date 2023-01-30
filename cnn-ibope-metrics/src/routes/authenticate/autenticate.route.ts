import { Router } from 'express';
import { authenticateUserController } from '../../useCase/authenticate';

const authenticateUser = Router();

authenticateUser.get("/", (req, res) => {
    authenticateUserController.handler(req, res);
});

export { authenticateUser };