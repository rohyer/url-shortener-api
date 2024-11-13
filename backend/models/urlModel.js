import getConnection from "../config/db.js";

const URLModel = {
  async createURL(url, shortCode) {
    const db = getConnection();

    try {
      const [result] = await db.execute(
        "INSERT INTO urls (url, short_code) VALUES (?, ?)",
        [url, shortCode]
      );

      const [rows] = await db.execute(
        "SELECT short_code FROM urls WHERE id = ? LIMIT 1",
        [result.insertId]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getURLById(idUser) {
    const db = getConnection();

    try {
      const [result] = await db.execute(
        "SELECT * FROM urls WHERE id = ? LIMIT 1",
        [idUser]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getURLsByUserId(idUser) {
    const db = getConnection();

    try {
      const [result] = await db.execute(
        "SELECT * FROM urls WHERE id_user = ?",
        [idUser]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateURL(url, id) {
    const db = getConnection();

    try {
      const [result] = await db.execute(
        "UPDATE urls SET url = ? WHERE id = ? LIMIT 1",
        [url, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteURL(id) {
    const db = getConnection();

    try {
      const [result] = await db.execute(
        "DELETE FROM urls WHERE id = ? LIMIT 1",
        [id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
};

export default URLModel;
