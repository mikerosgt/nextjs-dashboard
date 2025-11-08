require('dotenv').config({ path: '.env.local' });
const { db } = require('@vercel/postgres');

console.log('POSTGRES_URL:', process.env.POSTGRES_URL);

async function testConnection() {
  try {
    console.log('🔗 Testing connection...');
    const client = await db.connect();
    console.log('✅ Connected successfully!');
    
    // Test simple query
    const result = await client.sql`SELECT 1 as test`;
    console.log('✅ Query test passed:', result.rows[0]);
    
    await client.end();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();