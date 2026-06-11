import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
const app: Application = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World!');
  res.status(200).json({
    message: 'express server is runign ',
    'statuse code': 200,
  });
});
// app.post ('/post')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
