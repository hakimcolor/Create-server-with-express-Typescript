import { Router } from 'express';
import { profilecontroler } from './profile.controler';

const router = Router();
router.post('/', profilecontroler.createdata);

export const userProfile = {
  router,
};
