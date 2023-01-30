import { Router } from 'express';
import { authenticateUserController } from '../../useCase/authenticate';

const authenticateUser = Router();

authenticateUser.post("/", (req, res) => {
    authenticateUserController.handler(req, res);
});

export { authenticateUser };