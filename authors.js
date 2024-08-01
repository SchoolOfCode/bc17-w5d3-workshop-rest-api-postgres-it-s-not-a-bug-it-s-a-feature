// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getAuthors() {
  // Query the database and return all authors
  const SQLQUERY = `SELECT * FROM authors`;
  const result = await pool.query(SQLQUERY);
  return result.rows;
}

export async function getAuthorById(id) {
  // Query the database and return the author with a matching id or null
  const SQLQUERY = 'SELECT * from authors WHERE id = $1';
  const result = await pool.query(SQLQUERY, [id]);
  return result.rows[0] || null;
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author
  // $1 and $2 are placeholders for the first_name and last_name values.
  // the values are passed as an array in the second argument of the pool.query function
  const SQLQUERY = 
    `INSERT INTO authors (first_name, last_name)
    VALUES ($1, $2)
    RETURNING *;`
  const result = await pool.query(SQLQUERY, [author.first_name, author.last_name]);
  //array is 0 because we are only returning one row that we just inserted. 
  //we'd have to change code to enter multiple authors and return multiple rows.
  return result.rows[0];
  } 


export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author or null
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author or null
}
