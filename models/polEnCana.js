const { sql } = require('./database');

class PolEnCana {
  static async getAll() {
    try {
      const result = await sql.query('SELECT * FROM polEnCana');
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }

  static async create(polData) {
    try {
      const query = `
        INSERT INTO polEnCana (
          domingo, lunes, martes, miercoles, jueves, viernes, sabado,
          justificacionDomingo, justificacionLunes, justificacionMartes,
          justificacionMiercoles, justificacionJueves, justificacionViernes,
          justificacionSabado
        ) VALUES (
          @domingo, @lunes, @martes, @miercoles, @jueves, @viernes, @sabado,
          @justificacionDomingo, @justificacionLunes, @justificacionMartes,
          @justificacionMiercoles, @justificacionJueves, @justificacionViernes,
          @justificacionSabado
        )
      `;

      const request = new sql.Request();
      request.input('domingo', sql.Float, polData.domingo);
      request.input('lunes', sql.Float, polData.lunes);
      request.input('martes', sql.Float, polData.martes);
      request.input('miercoles', sql.Float, polData.miercoles);
      request.input('jueves', sql.Float, polData.jueves);
      request.input('viernes', sql.Float, polData.viernes);
      request.input('sabado', sql.Float, polData.sabado);
      request.input('justificacionDomingo', sql.VarChar(200), polData.justificacionDomingo);
      request.input('justificacionLunes', sql.VarChar(200), polData.justificacionLunes);
      request.input('justificacionMartes', sql.VarChar(200), polData.justificacionMartes);
      request.input('justificacionMiercoles', sql.VarChar(200), polData.justificacionMiercoles);
      request.input('justificacionJueves', sql.VarChar(200), polData.justificacionJueves);
      request.input('justificacionViernes', sql.VarChar(200), polData.justificacionViernes);
      request.input('justificacionSabado', sql.VarChar(200), polData.justificacionSabado);

      await request.query(query);
      return { success: true, message: 'Datos insertados correctamente' };
    } catch (error) {
      console.error('Error al insertar datos:', error);
      throw error;
    }
  }
  static async update(id, polData) {
    try {
      const query = `
        UPDATE polEnCana SET
          domingo = @domingo,
          lunes = @lunes,
          martes = @martes,
          miercoles = @miercoles,
          jueves = @jueves,
          viernes = @viernes,
          sabado = @sabado,
          justificacionDomingo = @justificacionDomingo,
          justificacionLunes = @justificacionLunes,
          justificacionMartes = @justificacionMartes,
          justificacionMiercoles = @justificacionMiercoles,
          justificacionJueves = @justificacionJueves,
          justificacionViernes = @justificacionViernes,
          justificacionSabado = @justificacionSabado
        WHERE id = @id
      `;
  
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      request.input('domingo', sql.Float, polData.domingo);
      request.input('lunes', sql.Float, polData.lunes);
      request.input('martes', sql.Float, polData.martes);
      request.input('miercoles', sql.Float, polData.miercoles);
      request.input('jueves', sql.Float, polData.jueves);
      request.input('viernes', sql.Float, polData.viernes);
      request.input('sabado', sql.Float, polData.sabado);
      request.input('justificacionDomingo', sql.VarChar(200), polData.justificacionDomingo);
      request.input('justificacionLunes', sql.VarChar(200), polData.justificacionLunes);
      request.input('justificacionMartes', sql.VarChar(200), polData.justificacionMartes);
      request.input('justificacionMiercoles', sql.VarChar(200), polData.justificacionMiercoles);
      request.input('justificacionJueves', sql.VarChar(200), polData.justificacionJueves);
      request.input('justificacionViernes', sql.VarChar(200), polData.justificacionViernes);
      request.input('justificacionSabado', sql.VarChar(200), polData.justificacionSabado);
  
      const result = await request.query(query);
      
      if (result.rowsAffected[0] === 0) {
        return { success: false, message: 'No se encontró el registro con el ID proporcionado' };
      }
      
      return { success: true, message: 'Datos actualizados correctamente' };
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      throw error;
    }
  }
  // Puedes agregar más métodos como update, delete, etc.
}

module.exports = PolEnCana;