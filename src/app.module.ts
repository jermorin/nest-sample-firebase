import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { FirebaseAdminModule } from '@tfarras/nestjs-firebase-admin'
import * as admin from 'firebase-admin'

import database from './config/database.config'
import firebase from './config/firebase.config'

import { UsersModule } from './users/users.module'
import { DevModule } from './dev/dev.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [database, firebase] }),
    FirebaseAdminModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        credential: admin.credential.cert(config.get('firebase.path')),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UsersModule,
    DevModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
