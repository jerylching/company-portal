import { Router } from 'express';
import { login } from '../controllers/user.controller.js'

const router = Router();

router.post('/', async (request, response) => {
    response.send(await login(request.body))
})

export default router;