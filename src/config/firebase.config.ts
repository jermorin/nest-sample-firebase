import { registerAs } from '@nestjs/config'

export interface FirebaseConfig {
  path: string
  apiKey: string
}

export default registerAs(
  'firebase',
  (): FirebaseConfig => ({
    path: process.env.FIREBASE_FILE_PATH || './firebase-service-account.json',
    apiKey: process.env.FIREBASE_API_KEY || '',
  }),
)
