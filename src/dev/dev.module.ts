import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DevService } from './dev.service'
import { DevController } from './dev.controller'
import firebase from '../config/firebase.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [firebase],
    }),
  ],
  controllers: [DevController],
  providers: [DevService],
  exports: [],
})
export class DevModule {}
