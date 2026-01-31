import { connectToDatabase } from './database/mongoose';

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  try {
    const connection = await connectToDatabase();
    console.log('✅ Database connection successful!');
    console.log('Connection state:', connection.connection.readyState);
    
    // Test a simple operation
    const db = connection.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
    // Close connection after test
    await connection.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

// Run the test
testDatabaseConnection();
