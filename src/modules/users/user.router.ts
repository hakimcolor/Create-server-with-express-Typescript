import { Router, type Request, type Response } from 'express';
import { pool } from '../../db';
import { userController } from './user.controller';

const router = Router();
router.post('/', userController.createuser);
//get all data 
router.get('/',)
export const userRout = router;
