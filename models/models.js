const { sql } = require('./database');

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll() {
    try {
      const result = await sql.query(`SELECT * FROM [${this.tableName}]`);
      return result.recordset;
    } catch (error) {
      console.error(`Error al obtener datos de ${this.tableName}:`, error);
      throw error;
    }
  }

  async getByDateRange(startDate, endDate) {
    try {
      const query = `
        SELECT * FROM [${this.tableName}]
        WHERE [fecha] BETWEEN @startDate AND @endDate
      `;
      
      const request = new sql.Request();
      request.input('startDate', sql.DateTime, startDate);
      request.input('endDate', sql.DateTime, endDate);
      
      const result = await request.query(query);
      return result.recordset;
    } catch (error) {
      console.error(`Error al obtener datos por rango de fechas de ${this.tableName}:`, error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const query = `
        SELECT * FROM [${this.tableName}]
        WHERE [id] = @id
      `;
      
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      
      const result = await request.query(query);
      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      console.error(`Error al obtener datos por ID de ${this.tableName}:`, error);
      throw error;
    }
  }

  
  async getByApartado(apartado) {
    try {
      const query = `
        SELECT * FROM [${this.tableName}]
        WHERE [apartado] = @apartado
      `;
      
      const request = new sql.Request();
      request.input('apartado', sql.VarChar, apartado);
      
      const result = await request.query(query);
      return result.recordset;
    } catch (error) {
      console.error(`Error al obtener datos por apartado de ${this.tableName}:`, error);
      throw error;
    }
  }

  
  async getByApartadoAndDateRange(apartado, startDate, endDate) {
    try {
      const query = `
        SELECT * FROM [${this.tableName}]
        WHERE [apartado] = @apartado 
        AND [fecha] BETWEEN @startDate AND @endDate
      `;
      
      const request = new sql.Request();
      request.input('apartado', sql.VarChar, apartado);
      request.input('startDate', sql.DateTime, startDate);
      request.input('endDate', sql.DateTime, endDate);
      
      const result = await request.query(query);
      return result.recordset;
    } catch (error) {
      console.error(`Error al obtener datos por apartado y rango de fechas de ${this.tableName}:`, error);
      throw error;
    }
  }

  
  async getApartados() {
    try {
      const query = `
        SELECT DISTINCT [apartado] FROM [${this.tableName}]
        WHERE [apartado] IS NOT NULL
        ORDER BY [apartado]
      `;
      
      const result = await sql.query(query);
      return result.recordset.map(row => row.apartado);
    } catch (error) {
      console.error(`Error al obtener apartados de ${this.tableName}:`, error);
      throw error;
    }
  }

  
  async getByApartadoAndDato(apartado, dato) {
    try {
      const query = `
        SELECT * FROM [${this.tableName}]
        WHERE [apartado] = @apartado 
        AND [dato] = @dato
      `;
      
      const request = new sql.Request();
      request.input('apartado', sql.VarChar, apartado);
      request.input('dato', sql.VarChar, dato);
      
      const result = await request.query(query);
      return result.recordset;
    } catch (error) {
      console.error(`Error al obtener datos por apartado y dato de ${this.tableName}:`, error);
      throw error;
    }
  }

  
  async getDatos() {
    try {
      const query = `
        SELECT DISTINCT [dato] FROM [${this.tableName}]
        WHERE [dato] IS NOT NULL
        ORDER BY [dato]
      `;
      
      const result = await sql.query(query);
      return result.recordset.map(row => row.dato);
    } catch (error) {
      console.error(`Error al obtener datos de ${this.tableName}:`, error);
      throw error;
    }
  }

  
  async getByZafra(zafra) {
    try {
      const query = `
        SELECT * FROM [${this.tableName}]
        WHERE [zafra] = @zafra
      `;
      
      const request = new sql.Request();
      request.input('zafra', sql.VarChar, zafra);
      
      const result = await request.query(query);
      return result.recordset;
    } catch (error) {
      console.error(`Error al obtener datos por zafra de ${this.tableName}:`, error);
      throw error;
    }
  }
}

const models = {};

const tables = [
  'Vapor_TN$',
  'Turbidez_jugo_claro$',
  'Turbidez_azucar$',
  'Sedimentos$',
  'RSD$',
  'Rendimiento_cristales_dia$',
  'Rendimiento_cristales$',
  'Reductores_promedio$',
  'Reductores_4h$',
  'Reductores$',
  'Recirculacion$',
  'Pza_jugo_mezclado_tierra_cana$',
  'Pureza_miel$',
  'Pureza$',
  'pHPromedio$',
  'pH_tratado$',
  'pH_2h$',
  'PH$',
  'Perdidas$',
  'Molienda$',
  'Masa_cocida$',
  'Limites',
  'IMBIBICION$',
  'Humedad_Pol_Bagazo$',
  'Ext_pol_pol_cana$',
  'Eficiencia_fabrica$',
  'Dextranas_solidos$',
  'Dextranas_brix$',
  'Cuadro_tiempo_perdido2$',
  'Cuadro_tiempo_perdido$',
  'Cuadro_reductores_prom$',
  'Cuadro_reductores$',
  'Cuadro_pureza$',
  'Cuadro_extraccion$',
  'Cuadro_caña_molida$',
  'Cuadro_cachaza$',
  'Cuadro_bagazo$',
  'Color_azucar$',
  'Color$',
  'Cana_molida_rendimiento$',
  'Cana_molida_produccion$',
  'Cana_molidas$',
  'Cachaza_caña$',
  'Bx_pza_miel_final$',
  'Brix_Meladura$',
  'Bagazo$',
  'RegistroZafra',
  'Datos_Turno',
  'Promedios',
  'DatosSQL',
  'Datos_Hora',
  'Datos_Dia',
  'Datos_Tablas',
  'Datos_Cuadros'
];

tables.forEach(tableName => {
  const key = tableName
    .replace(/\$/g, '')
    .replace(/_/g, '')
    .toLowerCase();
    
  models[key] = new BaseModel(tableName);
});

module.exports = models;