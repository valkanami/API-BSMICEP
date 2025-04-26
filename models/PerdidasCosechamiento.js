const { sql } = require('./database');

class PerdidasCosechamiento {
  static async getAll() {
    try {
      const result = await sql.query('SELECT * FROM [dbo].[PerdidasCosechamiento$]');
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
      const result = await request.query('SELECT * FROM [dbo].[PerdidasCosechamiento$] WHERE id = @id');
      return result.recordset[0];
    } catch (error) {
      console.error('Error al obtener registro por ID:', error);
      throw error;
    }
  }

  static async getByDia(dia) {
    try {
      const request = new sql.Request();
      request.input('dia', sql.NVarChar(255), dia);
      const result = await request.query('SELECT * FROM [dbo].[PerdidasCosechamiento$] WHERE Dia = @dia');
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener datos por día:', error);
      throw error;
    }
  }

  static async create(perdidaData) {
    try {
      const query = `
        INSERT INTO [dbo].[PerdidasCosechamiento$] (
          Dia, PerdidaxCosecha, PolFabrica
        ) VALUES (
          @Dia, @PerdidaxCosecha, @PolFabrica
        )
      `;

      const request = new sql.Request();
      request.input('Dia', sql.NVarChar(255), perdidaData.Dia);
      request.input('PerdidaxCosecha', sql.Float, perdidaData.PerdidaxCosecha);
      request.input('PolFabrica', sql.Float, perdidaData.PolFabrica);

      await request.query(query);
      return { success: true, message: 'Datos insertados correctamente' };
    } catch (error) {
      console.error('Error al insertar datos:', error);
      throw error;
    }
  }

  static async update(id, perdidaData) {
    try {
      const query = `
        UPDATE [dbo].[PerdidasCosechamiento$] SET
          Dia = @Dia,
          PerdidaxCosecha = @PerdidaxCosecha,
          PolFabrica = @PolFabrica
        WHERE id = @id
      `;
  
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      request.input('Dia', sql.NVarChar(255), perdidaData.Dia);
      request.input('PerdidaxCosecha', sql.Float, perdidaData.PerdidaxCosecha);
      request.input('PolFabrica', sql.Float, perdidaData.PolFabrica);
  
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
      const result = await request.query('DELETE FROM [dbo].[PerdidasCosechamiento$] WHERE id = @id');
      
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
        SELECT TOP 1 * FROM [dbo].[PerdidasCosechamiento$]
        ORDER BY (SELECT NULL)  -- Ajustar según se necesite para ordenar correctamente
      `);
      return result.recordset[0];
    } catch (error) {
      console.error('Error al obtener el último registro:', error);
      throw error;
    }
  }

  static async getStats() {
    try {
      const result = await sql.query(`
        SELECT 
          AVG(PerdidaxCosecha) as promedioPerdidaCosecha,
          MAX(PerdidaxCosecha) as maxPerdidaCosecha,
          MIN(PerdidaxCosecha) as minPerdidaCosecha,
          AVG(PolFabrica) as promedioPolFabrica,
          MAX(PolFabrica) as maxPolFabrica,
          MIN(PolFabrica) as minPolFabrica,
          COUNT(*) as totalRegistros
        FROM [dbo].[PerdidasCosechamiento$]
      `);
      return result.recordset[0];
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  }
}

module.exports = PerdidasCosechamiento;