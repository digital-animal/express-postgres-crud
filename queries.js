// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "123",
//   port: 5432,
// });

// const getUsers = async () => {
//   const result = await pool.query("SELECT * FROM hr.users ORDER BY id ASC");
//   console.log(result);
//   return result.rows;
//   // await pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//   //   if (error) {
//   //     throw error
//   //   }
//   //   console.log(results.rows)
//   //   return results.rows;
//   // })
// };

// module.exports = {
//   getUsers,
// };
