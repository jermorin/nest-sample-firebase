import { registerAs } from '@nestjs/config'

export interface DatabaseConfig {
  type: string
  port: number
  username: string
  password: string | null
  database: string
  host: string
  autoLoadEntities: boolean
  logging: boolean
}

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || null,
    database: process.env.POSTGRES_DATABASE || 'mckinsey-ptt',
    logging: process.env.TYPEORM_LOGGING === 'true',
    autoLoadEntities: true,
  }),
)
