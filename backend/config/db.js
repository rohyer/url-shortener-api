import mysql from "mysql2";

let pool;

const connectionDB = () => {
  try {
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "url_shortener"
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
