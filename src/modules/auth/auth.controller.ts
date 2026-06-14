import type { Request, Response } from 'express';
import { logingserintdb } from './auth.service';

const loginguserauth = async (req: Request, res: Response) => {

  try {
    const result = logingserintdb.loginguserintodb(req.body)
     // console.log(resulet);
    //  res.status(201).json({
    //    success: true,
    //    message: 'success your profile createad',
    //    data: resulet.rows,
    //  });
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
