import { Inject, Injectable } from '@nestjs/common'
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin'
import axios from 'axios'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DevService {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT) private firebaseAdmin: FirebaseAdminSDK,
    private configService: ConfigService,
  ) {}

  async generateToken(uid: string) {
    const customToken = await this.firebaseAdmin.auth().createCustomToken(uid)
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${this.configService.get(
      'firebase.apiKey',
    )}`
    const body = {
      token: customToken,
      returnSecureToken: true,
    }

    const { data } = await axios.post(url, body)

    return data?.idToken
  }
}
