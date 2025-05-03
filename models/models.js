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
        WHERE [FECHA] BETWEEN @startDate AND @endDate
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
}


const models = {};


const tables = [
  'Turbidez_jugo_claro$',
  'RSD$',
  'Rendimiento_cristales$',
  'Reductores_promedio$',
  'Reductores_4h$',
  'Reductores$',
  'Recirculacion$',
  'Pza_jugo_mezclado_tierra_cana$',
  'Pureza_miel$',
  'pHPromedio$',
  'pH_tratado$',
  'pH_2h$',
  'PH$',
  'Perdidas$',
  'Masa_cocida$',
  'Humedad_Pol_Bagazo$',
  'Ext_pol_pol_cana$',
  'Eficiencia_fabrica$',
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
  'Color$',
  'Caña_molida$',
  'Cachaza_caña$',
  'Brix_Meladura$',
  'Bagazo$'
];


tables.forEach(tableName => {
  const key = tableName
    .replace(/\$/g, '')  
    .replace(/_/g, '')   
    .toLowerCase();      
  
  models[key] = new BaseModel(tableName);
});

module.exports = models;