import mysql from "mysql2";

let pool;

const connectionDB = () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log("MySQL connected!");
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
    process.exit(1);
  }
};

const getConnection = () => {
  if (!pool) {
    throw new Error("Please, start the database first!");
  }
  return pool.promise();
};

connectionDB();

export default getConnection;
