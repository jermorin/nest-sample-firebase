import { Request } from 'express'
import { FirebaseUser } from '@tfarras/nestjs-firebase-admin'

export interface CustomRequest extends Request {
  user: FirebaseUser
}
