import { Router, type Request, type Response } from 'express';

import { pool } from '../../db';
import createUser from './user.contoroller';

const router = Router();

router.get('/', createUser);

export const userRoute = router;
