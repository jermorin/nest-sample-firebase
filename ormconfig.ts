// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || null,
  database: process.env.POSTGRES_DATABASE || 'nest-sample-firebase',
  logging: process.env.TYPEORM_LOGGING === 'true',
  autoLoadEntities: true,

  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
}
