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
//update data 
const updateonejson = async (payload: Iuser, id: string) => {
  const { name, password, age, is_active } = payload;
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
  return result;
};
const deleatdata=async()
export const userService = {
  createuserintodb,
  alldata,
  onedataget,
  updateonejson,
};
