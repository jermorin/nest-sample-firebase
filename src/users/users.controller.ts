import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
  FirebaseUser,
} from '@tfarras/nestjs-firebase-admin'

import { User } from './user.entity'
import { UsersService } from './users.service'
import { CustomRequest } from '../types/CustomRequest'
import { CmsGuard } from './cms.guard'
import { FirebaseUserDto } from './user.dto'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(FIREBASE_ADMIN_INJECT) private firebaseAdmin: FirebaseAdminSDK,
  ) {}

  @Get('list')
  @UseGuards(CmsGuard)
  @ApiResponse({
    status: 200,
    type: [User],
  })
  list(): Promise<User[]> {
    return this.usersService.list()
  }

  @Get('me')
  @ApiResponse({
    status: 200,
    type: FirebaseUserDto,
  })
  async me(@Req() req: CustomRequest): Promise<FirebaseUser & User> {
    const user = await this.usersService.findOne(req.user.uid)
    if (user) {
      return { ...user, ...req.user }
    } else {
      const create = await this.usersService.create({
        uid: req.user.uid,
        cms_access: false,
      })
      return { ...create, ...req.user }
    }
  }
}
