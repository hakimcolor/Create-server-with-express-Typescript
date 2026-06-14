import express, {
  type Application,
  type Request,
  type Response,
} from 'express';

import config from '../config';
// import config from './config';
import { initDB, pool } from '../db';
import { userRout } from '../modules/users/user.router';
import { userProfile } from '../modules/profile/profile.router';
import { authrouter } from '../modules/auth/auth.router';

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
app.use('api/user', userRout);

//post a single data from ui
app.use('/api/user', userRout);

//get all data for neondb
app.use('/api/user', userRout);
// get data through using id ..
app.use('/api/user/', userRout);

//put method for updategit
app.use('/api/user/', userRout);

//deleate using deleate
app.use('api/user/', userRout);

// create profile
app.use('/api/profile', userProfile.router);
app.use('/api/auth',authrouter.router)


export default app;
