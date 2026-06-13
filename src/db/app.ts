import express, {
  type Application,
  type Request,
  type Response,
} from 'express';

import config from '../config';
// import config from './config';
import { initDB, pool } from '../db';
import { userRout } from '../modules/users/user.router';

const app: Application = express();

app.use(express.json());
app.use(express.text());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Express server is running',
    statusCode: 200,
  });
});
//get all data
app.use('api/user', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM "user"
      `);
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
});

//post a single data from ui
app.use('/api/user', userRout);

//get all data for neondb

// get data through using id ..

app.get('/api/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const resulet = await pool.query(`SELECT * FROM "user" WHERE id=$1`, [id]);
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
});

//put method for updategit
app.put('/api/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;
  try {
    const result = await pool.query(
      //if not update thias why using coalesce ($1, name)
      `
  UPDATE "user"
  SET
    name = COALESCE($1, name), 
    password = COALESCE($2, password),
    age = COALESCE($3, age),
    is_active = COALESCE($4, is_active)
  WHERE id = $5
  RETURNING *;
  `,
      [name, password, age, is_active, id]
    );
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
});
//deleate using deleate
app.delete('/api/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      DELETE FROM "user"
      WHERE id = $1
      `,
      [id]
    );

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
});

export default app;
