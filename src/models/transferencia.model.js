import { db } from '../db.js';

const transferenciaModel = {
  async crearTransferencia({ emisor, receptor, monto }) {
    try {
      const conn = await db.getConnection();
      await conn.beginTransaction();

      try {
        const [result] = await conn.execute('CALL transferir(?, ?, ?);', [
          emisor,
          receptor,
          monto,
        ]);
        await conn.commit();
        conn.release();

        console.log(result);

        return result;
      } catch (error) {
        await conn.rollback();
        conn.release();

        console.log(error);

        if (error.code === 'ER_CHECK_CONSTRAINT_VIOLATED') return 'Saldo insuficiente';

        if (error.sqlState === '45000') return error; // retorna los errores establecidos en el procedure

        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async obtenerTodasTransferencias() {
    try {
      // Esta query es la unica parte del trabajo hecha por chat gepeto, aun no la analizo, pero funciona
      const query = `
      SELECT
      t.id_transferencia,
      u_emisor.nombre AS nombre_emisor,
      u_receptor.nombre AS nombre_receptor,
      t.monto,
      t.fecha
      FROM transferencias t
      JOIN usuarios u_emisor ON t.emisor = u_emisor.id_usuario
      JOIN usuarios u_receptor ON t.receptor = u_receptor.id_usuario;
      `;

      const conn = await db.getConnection();
      const [rows] = await conn.execute(query);
      conn.release();

      return rows;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export { transferenciaModel };
