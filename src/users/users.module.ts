import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { FirebaseAuthMiddleware } from '../authentication/firebase.middleware'
import { CmsGuard } from './cms.guard'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, CmsGuard],
  exports: [UsersService, CmsGuard],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes('users')
  }
}
