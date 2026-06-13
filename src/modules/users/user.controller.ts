import type { Request, Response } from 'express';
import { pool } from '../../db';
import { userService } from './user.service';

const createuser = async (req: Request, res: Response) => {
  try {
    // console.log('Request Body:', req.body);

    const { name, email, password, age } = req.body;
    const result = await userService.createuserintodb(req.body);
    // console.log('data is ', result);

    res.status(200).json({
      message: 'Request successful',
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal Server Error',
      error: error,
    });
  }
};
export const userController = {
  createuser,
};
