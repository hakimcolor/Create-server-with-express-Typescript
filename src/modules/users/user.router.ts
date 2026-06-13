import { Router, type Request, type Response } from 'express';
import { pool } from '../../db';
import { userController } from './user.controller';

const router = Router();
router.post('/', userController.createuser);
//get all data
router.get('/', userController.getallData);
router.get('/:id', userController.getOnedata);
router.put('/:id', userController.updatedata);
router.delete('/:id',userController.deleatedatadb);
export const userRout = router;
