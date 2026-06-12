// import express, {
//   type Application,
//   type Request,
//   type Response,
// } from 'express';
// import { error } from 'node:console';

// import { Pool } from 'pg';
// const app: Application = express();
// const port = 3000;
// app.use(express.json());
// app.use(express.text());
// const pool = new Pool({
//   connectionString:
//     'postgresql://neondb_owner:npg_5sfmlBF0Xyju@ep-lingering-bonus-atrqv1t1-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
// });
// const initDB = async () => {
//   try {
//     await pool.query(`
//           CREATE TABLE IF NOT EXISTS users(
//           id SERIAL PRIMARY KEY,
//           name VARCHAR(20),
//           email VARCHAR(20) NOT NULL,
//           password VARCHAR(20) NOT NULL,
//           is_active BOOLEAN DEFAULT true, age INT,
//         created_at TIMESTAMP DEFAULT NOW(),
//         update_at TIMESTAMP DEFAULT NOW()

//       `);
//     console.log('database c//////////////');
//   } catch {
//     console.log('error ',error);
//   }
// };
// initDB();
// app.get('/', (req: Request, res: Response) => {
//   // res.send('Hello World!');
//   res.status(200).json({
//     message: 'express server is runign ',
//     'statuse code': 200,
//   });
// });
// app.post('/post', async (req: Request, res: Response) => {
//   // Handle POST request
//   console.log(req.body);
//   const { name, roll, sex, position } = req.body;
//   const data = { name, roll, sex };
//   console.log('the data is this ', data);
//   res.status(200).json({
//     message: 'request done',
//     data: data,
//   });
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

import express, {
  type Application,
  type Request,
  type Response,
} from 'express';

import { Pool } from 'pg';
import config from './config';

const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(express.text());

const pool = new Pool({
  connectionString: config.connection_string,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

initDB();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Express server is running',
    statusCode: 200,
  });
});

app.post('/api/user', async (req: Request, res: Response) => {
  try {
    // console.log('Request Body:', req.body);

    const { name, email, password, age } = req.body;

    const result = await pool.query(
      `
       INSERT INTO "user" (name,email ,password,age)VALUES($1,$2,$3,$4) RETURNING *
      `,
      [name, email, password, age]
    );
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
});
//get all data for neondb
app.get('/api/user', async (req: Request, res: Response) => {
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
