const { sql } = require('./database');

class CanaMolida {
  static async getAll() {
    try {
      const result = await sql.query('SELECT * FROM [dbo].[CanaMolida$]');
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
      const result = await request.query('SELECT * FROM [dbo].[CanaMolida$] WHERE id = @id');
      
      if (result.recordset.length === 0) {
        return null;
      }
      
      return result.recordset[0];
    } catch (error) {
      console.error('Error al obtener registro por ID:', error);
      throw error;
    }
  }

  static async create(data) {
    try {
      const query = `
        INSERT INTO [dbo].[CanaMolida$] (
          Dia, Programa, Real
        ) VALUES (
          @dia, @programa, @real
        )
      `;

      const request = new sql.Request();
      request.input('dia', sql.NVarChar(255), data.dia);
      request.input('programa', sql.Float, data.programa);
      request.input('real', sql.Float, data.real);

      await request.query(query);
      return { success: true, message: 'Datos insertados correctamente' };
    } catch (error) {
      console.error('Error al insertar datos:', error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const query = `
        UPDATE [dbo].[CanaMolida$] SET
          Dia = @dia,
          Programa = @programa,
          Real = @real
        WHERE id = @id
      `;
  
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      request.input('dia', sql.NVarChar(255), data.dia);
      request.input('programa', sql.Float, data.programa);
      request.input('real', sql.Float, data.real);
  
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
      
      const result = await request.query('DELETE FROM [dbo].[CanaMolida$] WHERE id = @id');
      
      if (result.rowsAffected[0] === 0) {
        return { success: false, message: 'No se encontró el registro con el ID proporcionado' };
      }
      
      return { success: true, message: 'Registro eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar registro:', error);
      throw error;
    }
  }
}

module.exports = CanaMolida;