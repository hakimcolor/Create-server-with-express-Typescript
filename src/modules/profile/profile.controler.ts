import { error } from 'node:console';
import type { Request, Response } from 'express';
import { Result } from 'pg';
import { profileservice } from './profile.service';

const createdata = async (req: Request, res: Response) => {
  try {
    const resulet = await profileservice.createprofileintodb(req.body);
    // console.log(resulet);
    res.status(201).json({
      success: true,
      message: 'success your profile createad',
      data: resulet.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'success not  your profile createad',
      error: error,
    });
  }
};
export const profilecontroler = {
  createdata,
};
