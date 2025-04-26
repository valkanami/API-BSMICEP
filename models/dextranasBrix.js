const { sql } = require('./database');

class DextranasBrix {
  static async getAll() {
    try {
      const result = await sql.query('SELECT * FROM dextranasBrix');
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }

  static async create(dexData) {
    try {
      const query = `
        INSERT INTO dextranasBrix (
          domingoDesmenuzado, lunesDesmenuzado, martesDesmenuzado, miercolesDesmenuzado, 
          juevesDesmenuzado, viernesDesmenuzado, sabadoDesmenuzado,
          domingoMezclado, lunesMezclado, martesMezclado, miercolesMezclado, 
          juevesMezclado, viernesMezclado, sabadoMezclado,
          justificacionDomingoD, justificacionLunesD, justificacionMartesD, justificacionMiercolesD,
          justificacionJuevesD, justificacionViernesD, justificacionSabadoD,
          justificacionDomingoM, justificacionLunesM, justificacionMartesM, justificacionMiercolesM,
          justificacionJuevesM, justificacionViernesM, justificacionSabadoM
        ) VALUES (
          @domingoDesmenuzado, @lunesDesmenuzado, @martesDesmenuzado, @miercolesDesmenuzado,
          @juevesDesmenuzado, @viernesDesmenuzado, @sabadoDesmenuzado,
          @domingoMezclado, @lunesMezclado, @martesMezclado, @miercolesMezclado,
          @juevesMezclado, @viernesMezclado, @sabadoMezclado,
          @justificacionDomingoD, @justificacionLunesD, @justificacionMartesD, @justificacionMiercolesD,
          @justificacionJuevesD, @justificacionViernesD, @justificacionSabadoD,
          @justificacionDomingoM, @justificacionLunesM, @justificacionMartesM, @justificacionMiercolesM,
          @justificacionJuevesM, @justificacionViernesM, @justificacionSabadoM
        )
      `;

      const request = new sql.Request();
      request.input('domingoDesmenuzado', sql.Int, dexData.domingoDesmenuzado);
      request.input('lunesDesmenuzado', sql.Int, dexData.lunesDesmenuzado);
      request.input('martesDesmenuzado', sql.Int, dexData.martesDesmenuzado);
      request.input('miercolesDesmenuzado', sql.Int, dexData.miercolesDesmenuzado);
      request.input('juevesDesmenuzado', sql.Int, dexData.juevesDesmenuzado);
      request.input('viernesDesmenuzado', sql.Int, dexData.viernesDesmenuzado);
      request.input('sabadoDesmenuzado', sql.Int, dexData.sabadoDesmenuzado);
      
      request.input('domingoMezclado', sql.Int, dexData.domingoMezclado);
      request.input('lunesMezclado', sql.Int, dexData.lunesMezclado);
      request.input('martesMezclado', sql.Int, dexData.martesMezclado);
      request.input('miercolesMezclado', sql.Int, dexData.miercolesMezclado);
      request.input('juevesMezclado', sql.Int, dexData.juevesMezclado);
      request.input('viernesMezclado', sql.Int, dexData.viernesMezclado);
      request.input('sabadoMezclado', sql.Int, dexData.sabadoMezclado);
      
      request.input('justificacionDomingoD', sql.VarChar(200), dexData.justificacionDomingoD);
      request.input('justificacionLunesD', sql.VarChar(200), dexData.justificacionLunesD);
      request.input('justificacionMartesD', sql.VarChar(200), dexData.justificacionMartesD);
      request.input('justificacionMiercolesD', sql.VarChar(200), dexData.justificacionMiercolesD);
      request.input('justificacionJuevesD', sql.VarChar(200), dexData.justificacionJuevesD);
      request.input('justificacionViernesD', sql.VarChar(200), dexData.justificacionViernesD);
      request.input('justificacionSabadoD', sql.VarChar(200), dexData.justificacionSabadoD);
      
      request.input('justificacionDomingoM', sql.VarChar(200), dexData.justificacionDomingoM);
      request.input('justificacionLunesM', sql.VarChar(200), dexData.justificacionLunesM);
      request.input('justificacionMartesM', sql.VarChar(200), dexData.justificacionMartesM);
      request.input('justificacionMiercolesM', sql.VarChar(200), dexData.justificacionMiercolesM);
      request.input('justificacionJuevesM', sql.VarChar(200), dexData.justificacionJuevesM);
      request.input('justificacionViernesM', sql.VarChar(200), dexData.justificacionViernesM);
      request.input('justificacionSabadoM', sql.VarChar(200), dexData.justificacionSabadoM);

      await request.query(query);
      return { success: true, message: 'Datos insertados correctamente' };
    } catch (error) {
      console.error('Error al insertar datos:', error);
      throw error;
    }
  }

  static async update(id, dexData) {
    try {
      const query = `
        UPDATE dextranasBrix SET
          domingoDesmenuzado = @domingoDesmenuzado,
          lunesDesmenuzado = @lunesDesmenuzado,
          martesDesmenuzado = @martesDesmenuzado,
          miercolesDesmenuzado = @miercolesDesmenuzado,
          juevesDesmenuzado = @juevesDesmenuzado,
          viernesDesmenuzado = @viernesDesmenuzado,
          sabadoDesmenuzado = @sabadoDesmenuzado,
          domingoMezclado = @domingoMezclado,
          lunesMezclado = @lunesMezclado,
          martesMezclado = @martesMezclado,
          miercolesMezclado = @miercolesMezclado,
          juevesMezclado = @juevesMezclado,
          viernesMezclado = @viernesMezclado,
          sabadoMezclado = @sabadoMezclado,
          justificacionDomingoD = @justificacionDomingoD,
          justificacionLunesD = @justificacionLunesD,
          justificacionMartesD = @justificacionMartesD,
          justificacionMiercolesD = @justificacionMiercolesD,
          justificacionJuevesD = @justificacionJuevesD,
          justificacionViernesD = @justificacionViernesD,
          justificacionSabadoD = @justificacionSabadoD,
          justificacionDomingoM = @justificacionDomingoM,
          justificacionLunesM = @justificacionLunesM,
          justificacionMartesM = @justificacionMartesM,
          justificacionMiercolesM = @justificacionMiercolesM,
          justificacionJuevesM = @justificacionJuevesM,
          justificacionViernesM = @justificacionViernesM,
          justificacionSabadoM = @justificacionSabadoM
        WHERE id = @id
      `;
  
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      request.input('domingoDesmenuzado', sql.Int, dexData.domingoDesmenuzado);
      request.input('lunesDesmenuzado', sql.Int, dexData.lunesDesmenuzado);
      request.input('martesDesmenuzado', sql.Int, dexData.martesDesmenuzado);
      request.input('miercolesDesmenuzado', sql.Int, dexData.miercolesDesmenuzado);
      request.input('juevesDesmenuzado', sql.Int, dexData.juevesDesmenuzado);
      request.input('viernesDesmenuzado', sql.Int, dexData.viernesDesmenuzado);
      request.input('sabadoDesmenuzado', sql.Int, dexData.sabadoDesmenuzado);
      
      request.input('domingoMezclado', sql.Int, dexData.domingoMezclado);
      request.input('lunesMezclado', sql.Int, dexData.lunesMezclado);
      request.input('martesMezclado', sql.Int, dexData.martesMezclado);
      request.input('miercolesMezclado', sql.Int, dexData.miercolesMezclado);
      request.input('juevesMezclado', sql.Int, dexData.juevesMezclado);
      request.input('viernesMezclado', sql.Int, dexData.viernesMezclado);
      request.input('sabadoMezclado', sql.Int, dexData.sabadoMezclado);
      
      request.input('justificacionDomingoD', sql.VarChar(200), dexData.justificacionDomingoD);
      request.input('justificacionLunesD', sql.VarChar(200), dexData.justificacionLunesD);
      request.input('justificacionMartesD', sql.VarChar(200), dexData.justificacionMartesD);
      request.input('justificacionMiercolesD', sql.VarChar(200), dexData.justificacionMiercolesD);
      request.input('justificacionJuevesD', sql.VarChar(200), dexData.justificacionJuevesD);
      request.input('justificacionViernesD', sql.VarChar(200), dexData.justificacionViernesD);
      request.input('justificacionSabadoD', sql.VarChar(200), dexData.justificacionSabadoD);
      
      request.input('justificacionDomingoM', sql.VarChar(200), dexData.justificacionDomingoM);
      request.input('justificacionLunesM', sql.VarChar(200), dexData.justificacionLunesM);
      request.input('justificacionMartesM', sql.VarChar(200), dexData.justificacionMartesM);
      request.input('justificacionMiercolesM', sql.VarChar(200), dexData.justificacionMiercolesM);
      request.input('justificacionJuevesM', sql.VarChar(200), dexData.justificacionJuevesM);
      request.input('justificacionViernesM', sql.VarChar(200), dexData.justificacionViernesM);
      request.input('justificacionSabadoM', sql.VarChar(200), dexData.justificacionSabadoM);
  
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
}

module.exports = DextranasBrix;