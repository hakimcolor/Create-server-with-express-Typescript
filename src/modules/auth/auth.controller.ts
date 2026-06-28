import type { Request, Response } from 'express';
import { logingserintdb } from './auth.service';

const loginguserauth = async (req: Request, res: Response) => {
  try {
    const result = await logingserintdb.loginguserintodb(req.body);
    console.log(result);
     res.status(200).json({
       success: true,
       message: 'login successfully.. done ..t hanks for yoru login.. ',
       data: result,
     });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'success not  your profile createad',
      error: error.message,
    });
  }
};

export const authcontroller = {
  loginguserauth,
};
