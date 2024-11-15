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

    console.log("MySQL conectado!");
  } catch (error) {
    console.log(`Erro ao conectar com o banco de dados: ${error}`);
    process.exit(1);
  }
};

const getConnection = () => {
  if (!pool) {
    throw new Error("Por favor, inicie o Banco de dado primeiro!");
  }
  return pool.promise();
};

connectionDB();

export default getConnection;
