import { Router } from 'express';
import { createUser } from '../controllers/user.controller.js';
import authenticator from '../modules/authenticator.js';

const router = Router();

router.post('/', authenticator.verifyAccessToken, async (request, response) => {
    const result = await createUser(request.body, request.user.role);
    response.status(result.error ? 403 : 201).send(result);
});

export default router;