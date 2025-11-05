require('dotenv').config({ path: '.env.local' }); // AGREGAR ESTA LÍNEA
const { db } = require('@vercel/postgres');

async function testConnection() {
  try {
    console.log('🔗 Probando conexión a la base de datos...');
    console.log('POSTGRES_URL:', process.env.POSTGRES_URL ? '✅ Configurada' : '❌ No configurada');
    
    const client = await db.connect();
    console.log('✅ Conexión exitosa a Vercel Postgres');
    
    // Probar si las tablas existen
    const tables = await client.sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('📊 Tablas existentes:', tables.rows.map(row => row.table_name));
    
    await client.end();
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

testConnection();