import bcrypt from 'bcryptjs';
import { pool } from '../../db';

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
};
export const logingserintdb = {
  loginguserintodb,
};
