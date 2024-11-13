import getConnection from "../config/db.js";

const URLModel = {
  async createURL(url, shortCode, idUser) {
    const db = getConnection();

    try {
      const [result] = await db.execute(
        "INSERT INTO urls (url, short_code, id_user) VALUES (?, ?, ?)",
        [url, shortCode, idUser]
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
        "SELECT * FROM urls WHERE deleted_at IS NULL AND id = ? LIMIT 1",
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
        "SELECT url, short_code, click_count FROM urls WHERE deleted_at IS NULL AND id_user = ?",
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
        "UPDATE urls SET url = ? WHERE deleted_at IS NULL AND id = ? LIMIT 1",
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
      const query =
        "UPDATE urls SET deleted_at = FROM_UNIXTIME(?) WHERE deleted_at IS NULL AND id = ? LIMIT 1";

      const deletedAt = Math.floor(Date.now() / 1000);

      const [result] = await db.execute(query, [deletedAt, id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
};

export default URLModel;
