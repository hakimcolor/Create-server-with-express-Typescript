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
const getallData = async (req: Request, res: Response) => {
  try {
    const result = await userService.alldata();
    res.status(200).json({
      success: true,
      message: 'user all sucessfully here..',
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      sucess: false,
      message: error.message,
      error: error,
    });
  }
};
const getOnedata = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const resulet = await userService.onedataget(id as string);
    if (resulet.rows.length === 0) {
      res.status(500).json({ success: false });
    }
    res.status(200).json({
      success: true,
      message: 'user retived sucessfully id ..',
      data: resulet.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const updatedata = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;
  try {
    const result = await userService.updateonejson(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(500).json({ success: false });
    }
    res.status(200).json({
      success: true,
      message: 'user retived sucessfully id ..',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const deleatedatadb = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.deleatdata(id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};
export const userController = {
  createuser,
  getallData,
  getOnedata,
  updatedata,
  deleatedatadb,
};
