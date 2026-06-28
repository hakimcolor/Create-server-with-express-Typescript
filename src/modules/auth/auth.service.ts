import bcrypt from 'bcryptjs';
import { pool } from '../../db';
import jwt from 'jsonwebtoken';
import { stringify } from 'node:querystring';
import config from '../../config';
const loginguserintodb = async (ppayload: {
  email: string;
  password: string;
}) => {
  const { email, password } = ppayload;
  const userdata = await pool.query(
    `
    SELECT * FROM "user" WHERE email=$1
    `,
    [email]
  );
  if (userdata.rows.length === 0) {
    throw new Error('not ......');
  }
  const user = userdata.rows[0];
  const matchpassword = await bcrypt.compare(password, user.password);
  if (!matchpassword) {
    throw new Error('not ......');
  }
  const jwtplayload = {
    id: user.id,
    name: user.name,
    is_active: user.is_acitve,
    email: user.email,
  };
  const accesstoken = jwt.sign(jwtplayload, config.secret as string, {
    expiresIn: '1d',
  });

  return accesstoken;
};
export const logingserintdb = {
  loginguserintodb,
};
