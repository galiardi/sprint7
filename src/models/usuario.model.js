import { db } from '../db.js';

const usuarioModel = {
  async crearUsuario({ nombre, balance }) {
    try {
      const query = `
        INSERT INTO usuarios (nombre, balance)
        VALUES (?, ?); 
      `;
      const conn = await db.getConnection();
      const [result] = await conn.execute(query, [nombre, balance]);
      conn.release();

      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async obtenerTodosUsuarios() {
    try {
      const query = `
        SELECT * FROM usuarios
        WHERE state = 1;
      `;

      const conn = await db.getConnection();
      const [rows] = await conn.query(query);
      conn.release();

      return rows;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async actualizarUsuario({ id, nombre, balance }) {
    try {
      const query = `
        UPDATE usuarios
        SET nombre = ?, balance = ?
        WHERE id_usuario = ? AND state = 1;
      `;
      const conn = await db.getConnection();
      const [result] = await conn.execute(query, [nombre, balance, id]);
      conn.release();

      if (result.affectedRows === 0) return 'El usuario no existe';

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async borrarUsuario(id) {
    try {
      const query = `
        UPDATE usuarios
        SET state = 0
        WHERE id_usuario = ? AND state = 1;
      `;
      const conn = await db.getConnection();
      const [result] = await conn.execute(query, [id]);
      conn.release();

      if (result.affectedRows === 0) return 'El usuario no existe';

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export { usuarioModel };
