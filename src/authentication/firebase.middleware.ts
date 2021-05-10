import { HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin'

import { NextFunction, Response } from 'express'
import { CustomRequest } from '../types/CustomRequest'

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT) private firebaseAdmin: FirebaseAdminSDK,
  ) {}
  async use(req: CustomRequest, _: Response, next: NextFunction) {
    const { authorization } = req.headers
    // Bearer ezawagawg.....
    try {
      const token = authorization.slice(7)

      req.user = await this.firebaseAdmin.auth().verifyIdToken(token)
      next()
    } catch (error: unknown) {
      throw new HttpException(
        { message: 'Token is invalid', error },
        HttpStatus.UNAUTHORIZED,
      )
    }
  }
}
