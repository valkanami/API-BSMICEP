const { sql } = require('./database');

class PHClaroFiltrado {
  static async getAll() {
    try {
      const result = await sql.query('SELECT * FROM [dbo].[PHClaroFiltrado$] ORDER BY Hora ASC');
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      const result = await request.query('SELECT * FROM [dbo].[PHClaroFiltrado$] WHERE id = @id');
      return result.recordset[0];
    } catch (error) {
      console.error('Error al obtener registro por ID:', error);
      throw error;
    }
  }

  static async getByDateRange(startDate, endDate) {
    try {
      const request = new sql.Request();
      request.input('startDate', sql.DateTime, startDate);
      request.input('endDate', sql.DateTime, endDate);
      const result = await request.query(`
        SELECT * FROM [dbo].[PHClaroFiltrado$] 
        WHERE Hora >= @startDate AND Hora <= @endDate
        ORDER BY Hora ASC
      `);
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener datos por rango de fechas:', error);
      throw error;
    }
  }

  static async create(phData) {
    try {
      const query = `
        INSERT INTO [dbo].[PHClaroFiltrado$] (
          Hora, PHClaro, PHFiltrado
        ) VALUES (
          @Hora, @PHClaro, @PHFiltrado
        )
      `;

      const request = new sql.Request();
      request.input('Hora', sql.DateTime, phData.Hora || new Date());
      request.input('PHClaro', sql.Float, phData.PHClaro);
      request.input('PHFiltrado', sql.Float, phData.PHFiltrado);

      await request.query(query);
      return { success: true, message: 'Datos insertados correctamente' };
    } catch (error) {
      console.error('Error al insertar datos:', error);
      throw error;
    }
  }

  static async update(id, phData) {
    try {
      const query = `
        UPDATE [dbo].[PHClaroFiltrado$] SET
          Hora = @Hora,
          PHClaro = @PHClaro,
          PHFiltrado = @PHFiltrado
        WHERE id = @id
      `;
  
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      request.input('Hora', sql.DateTime, phData.Hora);
      request.input('PHClaro', sql.Float, phData.PHClaro);
      request.input('PHFiltrado', sql.Float, phData.PHFiltrado);
  
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

  static async delete(id) {
    try {
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      const result = await request.query('DELETE FROM [dbo].[PHClaroFiltrado$] WHERE id = @id');
      
      if (result.rowsAffected[0] === 0) {
        return { success: false, message: 'No se encontró el registro con el ID proporcionado' };
      }
      
      return { success: true, message: 'Registro eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar registro:', error);
      throw error;
    }
  }

  static async getLatest() {
    try {
      const result = await sql.query(`
        SELECT TOP 1 * FROM [dbo].[PHClaroFiltrado$]
        ORDER BY Hora DESC
      `);
      return result.recordset[0];
    } catch (error) {
      console.error('Error al obtener el último registro:', error);
      throw error;
    }
  }
}

module.exports = PHClaroFiltrado;