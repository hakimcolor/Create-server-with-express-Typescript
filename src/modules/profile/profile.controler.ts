import { error } from 'node:console';
import type { Request, Response } from 'express';
import { Result } from 'pg';

const createdata = async (req: Request, res: Response) => {
  try {
    const resulet = req.body;
    console.log(resulet);
    res.status(201).json({
      success: true,
      message: 'success your profile createad',
      data: resulet,
    });
  } catch (error: any) {
    res.status(201).json({
      success: false,
      message: 'success your profile createad',
    });
  }
};
export const profilecontroler = {
  createdata,
};
