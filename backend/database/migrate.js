const { migrate } = require('node-pg-migrate');
const path = require('path');
const dbConfig = require('./migrate-pg-config');

async function runMigrations() {
  try {
    await migrate({
      databaseUrl: dbConfig.connectionString,
      migrationsDir: path.join(__dirname, 'migrations')
    });

    console.log('Миграции успешно применены');
  } catch (error) {
    console.error('Ошибка при применении миграций:', error);
  }
}

// Запуск миграций
runMigrations();
