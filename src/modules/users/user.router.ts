import { Router, type Request, type Response } from 'express';

import { pool } from '../../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
        SELECT * FROM "user"`);
    res.status(200).json({
      success: true,
      message: 'users retrived succesfully',
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

export const userRoute = router;
