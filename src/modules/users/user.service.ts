import { pool } from '../../db';
import type { Iuser } from './user.typs';

const createuserintodb = async (payload: Iuser) => {
  const { name, email, password, age } = payload;

  const result = await pool.query(
    `
       INSERT INTO "user" (name,email ,password,age)VALUES($1,$2,$3,$4) RETURNING *
      `,
    [name, email, password, age]
  );
  return result;
};
const alldata = async () => {
  const result = await pool.query(`
      SELECT * FROM "user"
      `);
  return result;
};
const onedataget = async (id: string) => {
  const resulet = await pool.query(`SELECT * FROM "user" WHERE id=$1`, [id]);
  return resulet;
};
export const userService = {
  createuserintodb,
  alldata,
  onedataget,
};
