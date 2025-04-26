const { sql } = require('./database');

class ReporteCosecha {
  static async getAll() {
    try {
      const result = await sql.query('SELECT * FROM [ReporteCosecha$]');
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }

  static async create(reporteData) {
    try {
      const query = `
        INSERT INTO [ReporteCosecha$] (
          CONCEPTO, VALOR, OBJETIVO
        ) VALUES (
          @concepto, @valor, @objetivo
        )
      `;

      const request = new sql.Request();
      request.input('concepto', sql.NVarChar(255), reporteData.CONCEPTO);
      request.input('valor', sql.Float, reporteData.VALOR);
      request.input('objetivo', sql.NVarChar(255), reporteData.OBJETIVO);

      await request.query(query);
      return { success: true, message: 'Datos insertados correctamente' };
    } catch (error) {
      console.error('Error al insertar datos:', error);
      throw error;
    }
  }

  static async update(concepto, reporteData) {
    try {
      const query = `
        UPDATE [ReporteCosecha$] SET
          VALOR = @valor,
          OBJETIVO = @objetivo
        WHERE CONCEPTO = @concepto
      `;
  
      const request = new sql.Request();
      request.input('concepto', sql.NVarChar(255), concepto);
      request.input('valor', sql.Float, reporteData.VALOR);
      request.input('objetivo', sql.NVarChar(255), reporteData.OBJETIVO);
  
      const result = await request.query(query);
      
      if (result.rowsAffected[0] === 0) {
        return { success: false, message: 'No se encontró el registro con el CONCEPTO proporcionado' };
      }
      
      return { success: true, message: 'Datos actualizados correctamente' };
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      throw error;
    }
  }

  static async delete(concepto) {
    try {
      const query = `DELETE FROM [ReporteCosecha$] WHERE CONCEPTO = @concepto`;
  
      const request = new sql.Request();
      request.input('concepto', sql.NVarChar(255), concepto);
  
      const result = await request.query(query);
      
      if (result.rowsAffected[0] === 0) {
        return { success: false, message: 'No se encontró el registro con el CONCEPTO proporcionado' };
      }
      
      return { success: true, message: 'Registro eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar datos:', error);
      throw error;
    }
  }
  
  static async getByConcepto(concepto) {
    try {
      const query = `SELECT * FROM [ReporteCosecha$] WHERE CONCEPTO = @concepto`;
      
      const request = new sql.Request();
      request.input('concepto', sql.NVarChar(255), concepto);
      
      const result = await request.query(query);
      
      if (result.recordset.length === 0) {
        return null;
      }
      
      return result.recordset[0];
    } catch (error) {
      console.error('Error al obtener datos por concepto:', error);
      throw error;
    }
  }
}

module.exports = ReporteCosecha;