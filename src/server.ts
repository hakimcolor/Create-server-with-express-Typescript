import express, {
  type Application,
  type Request,
  type Response,
} from 'express';

import { Pool } from 'pg';
const app: Application = express();
const port = 3000;
app.use(express.json());
app.use(express.text());
const poll = new Pool({
  connectionString:
    'postgresql://neondb_owner:npg_5sfmlBF0Xyju@ep-lingering-bonus-atrqv1t1-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World!');
  res.status(200).json({
    message: 'express server is runign ',
    'statuse code': 200,
  });
});
app.post('/post', async (req: Request, res: Response) => {
  // Handle POST request
  console.log(req.body);
  const { name, roll, sex, position } = req.body;
  const data = { name, roll, sex };
  console.log('the data is this ', data);
  res.status(200).json({
    message: 'request done',
    data: data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
