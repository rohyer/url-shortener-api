const getConnection = require("../config/db");

const UserModel = {
  async setUser(name, email, password) {
    const db = getConnection();

    try {
      const [result] = await db.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email) {
    const db = getConnection();

    try {
      const [result] = await db.execute(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [email]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id) {
    const db = getConnection();

    try {
      const [result] = await db.execute(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = UserModel;
