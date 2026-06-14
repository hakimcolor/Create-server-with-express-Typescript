import { pool } from '../../db';
import type { Iuser } from './user.typs';
import bcrypt from 'bcryptjs';
const createuserintodb = async (payload: Iuser) => {
  const { name, email, password, age } = payload;
  const hashpassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
       INSERT INTO "user" (name,email ,password,age)VALUES($1,$2,$3,$4) RETURNING *
      `,
    [name, email, hashpassword, age]
  );

  delete result.rows[0].password;
  return result;
};
const alldata = async () => {
  const result = await pool.query(`
      SELECT id, name, email, age, is_active FROM "user"
      `);
  return result;
};
const onedataget = async (id: string) => {
  const resulet = await pool.query(`SELECT * FROM "user" WHERE id=$1`, [id]);
  return resulet;
};
//update data
const updateonejson = async (payload: Iuser, id: string) => {
  const { name, password, age, is_active } = payload;
  const hashpassword = await bcrypt.hash(password, 10);
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
    [name, hashpassword, age, is_active, id]
  );
  delete result.rows[0].password;

  return result;
};
const deleatdata = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM "user"
      WHERE id = $1
      `,
    [id]
  );
  return result;
};
export const userService = {
  createuserintodb,
  alldata,
  onedataget,
  updateonejson,
  deleatdata,
};
